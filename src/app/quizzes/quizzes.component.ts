import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { faQuestionCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../store/app.reducer';
import * as HomeQuizzesActions from './store/quizzes.actions';
import { Quiz } from './../models/quiz.model';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  faSearch = faSearch;

  quizzes: Quiz[] = null;
  storeQuizzes: Quiz[] = null;
  loading = false;
  loaded = false;
  errors: string[] = null;


  searchForm: FormGroup;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['QUIZZES.QUIZZES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['QUIZZES.QUIZZES']}`);
      });
    });

    this.store.dispatch(new HomeQuizzesActions.FetchQuizzesStart());

    this.searchForm = new FormGroup({
      title: new FormControl(null)
    });


    this.breadcrumbLinks = [
      { url: '/', label: 'Home', translate: true },
      { label: 'Quizzes', translate: true },
    ];

    this.store.select('homeQuizzes').subscribe(state => {
      this.storeQuizzes = state.quizzes;
      this.quizzes = this.storeQuizzes;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.errors = state.errors;
    });
  }

  onRefresh() {
    this.store.dispatch(new HomeQuizzesActions.FetchQuizzesStart());
    this.searchForm.reset();
  }

  onSearch() {
    const searchKey: string = this.searchForm.value.title;

    if (searchKey == '' || searchKey === null) {
      this.quizzes = this.storeQuizzes;
    } else {
      if (this.currentLang === 'en')
        this.quizzes = this.quizzes.filter(c => c.title_EN.toLowerCase().includes(searchKey.toLowerCase()));
      else if (this.currentLang === 'fr')
        this.quizzes = this.quizzes.filter(c => c.title_FR.toLowerCase().includes(searchKey.toLowerCase()));
    }
  }

  onClearSearch() {
    this.searchForm.reset();
    this.onSearch();
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}
