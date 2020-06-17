import { PrivacyPolicyComponent } from './../privacy-policy/privacy-policy.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as AppSettingActions from '../AppSettings/store/app-settings.actions';
import * as AboutActions from '../admin/about/store/about.actions';
import { ReportBugComponent } from './../report-bug/report-bug.component';
import { SignalRAppService } from './../AppSettings/services/signalr-app-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isAuthenticated = false;
  userId: string = null;

  loadingRate = false;
  rating = false;
  rated = false;
  totalRatingsN = 0.0;
  totalRating: string = null;
  userRating = 0.0;
  totalRatingsCount = 0;

  totalVisits: number = null;
  loadingVisits = false;

  name: string = null;
  email: string = null;
  website: string = null;
  errors: string[] = null;

  currentYear: number = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private signalRAppService: SignalRAppService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    if (!localStorage.getItem('lang')) {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      translate.use(localStorage.getItem('lang'));
    }
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.store.select('login').subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.userId = state.user ? state.user.id : null;


      this.store.dispatch(new AppSettingActions.FetchRateStart());
      this.store.dispatch(new AppSettingActions.FetchVisitsClientStart());

      this.store.select('appSettings').subscribe(state => {
        this.totalRatingsN = state.total;
        this.totalRating = state.total.toFixed(1);
        this.totalRatingsCount = state.ratings ? state.ratings.length : 0;
        this.loadingRate = state.loading;
        this.rating = state.rating;
        this.rated = state.rated;

        this.totalVisits = state.totalVisits;
        this.loadingVisits = state.loadingVisits;

        if (this.isAuthenticated && state.ratings.length > 0) {
          const rating = state.ratings.find(r => r.userId === this.userId);
          this.userRating = rating ? rating.value : 0.0
          this.rated = rating ? true : false;
        }
      });
    });

    this.store.dispatch(new AboutActions.FetchStart());
    this.store.select('about').subscribe(state => {
      if (state.loaded && state.about) {
        this.name = state.about.name;
        this.email = state.about.email1;
        this.website = state.about.website;
      }
    });

  }


  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    const newValue = $event.newValue;

    if (this.isAuthenticated) {
      this.store.dispatch(new AppSettingActions.RateStart(newValue));
    }
    else {

    }
  }

  onReportBug() {
    const dialogRef = this.dialog.open(ReportBugComponent, {
      width: '550px',
      disableClose: true
    });
  }

  onOpenPrivacyPolicy() {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent, {
      width: '650px',
      disableClose: true
    });
  }

  onChangeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
