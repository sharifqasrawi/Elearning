import { DomSanitizer } from '@angular/platform-browser';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { About } from './../models/about.model';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as AboutActions from '../admin/about/store/about.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  about: About = null;
  loading = false;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.currentLang = this.translate.currentLang);

    this.store.dispatch(new AboutActions.FetchStart());

    this.store.select('about').subscribe(state => {
      this.about = state.about;
      this.loading = state.loading;
    });

  }


  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);

}
