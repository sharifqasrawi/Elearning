import { TranslateService } from '@ngx-translate/core';
import { faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import { Course } from './../models/course.model';
import { Category } from './../models/category.model';

import * as fromApp from '../store/app.reducer';
import * as HomeActions from './store/home.actions';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  faThumbsUp = faThumbsUp;

  // courses: Course[] = null;
  categories: Category[] = null;
  storeCategories: Category[] = null;
  errors: string[] = null;
  loading = false;

  courses: Course[] = null;
  loadingCourses = false;

  searchForm: FormGroup;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.currentLang = this.translate.currentLang);

    this.store.dispatch(new HomeActions.FetchStart());
    this.store.dispatch(new HomeActions.FetchLatestCoursesStart());


    this.store.select('home').subscribe(state => {
      this.storeCategories = state.categories;
      this.categories = this.storeCategories;
      this.loading = state.loading;

      this.courses = state.courses;
      this.loadingCourses = state.loadingCourses;
      this.errors = state.errors;
    });


    this.searchForm = new FormGroup({
      title_EN: new FormControl(null)
    });
  }

  onSearch() {
    const searchKey: string = this.searchForm.value.title_EN;

    if (searchKey == '' || searchKey === null) {
      this.categories = this.storeCategories;
    } else {
      this.categories = this.storeCategories.filter(c => c.title_EN.toLowerCase().includes(searchKey.toLowerCase()));
    }
  }

  onClearSearch() {
    this.searchForm.reset();
    this.onSearch();
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}
