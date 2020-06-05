import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as AppSettingActions from '../AppSettings/store/app-settings.actions';
import { ReportBugComponent } from './../report-bug/report-bug.component';
import { SignalRAppService } from './../AppSettings/services/signalr-app-service.service';
import { ErrorDialogComponent } from './../shared/error-dialog/error-dialog.component';

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
    this.store.select('login').subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.userId = state.user ? state.user.id : null;


      this.store.dispatch(new AppSettingActions.FetchRateStart());

      this.store.select('appSettings').subscribe(state => {
        this.totalRatingsN = state.total;
        this.totalRating = state.total.toFixed(1);
        this.totalRatingsCount = state.ratings ? state.ratings.length : 0;
        this.loadingRate = state.loading;
        this.rating = state.rating;
        this.rated = state.rated;

        // if (state.errors) {
        //   this.dialog.open(ErrorDialogComponent, {
        //     width: '450px',
        //     data: { errors: state.errors }
        //   });
        // }


        if (this.isAuthenticated && state.ratings.length > 0) {
          const rating = state.ratings.find(r => r.userId === this.userId);
          this.userRating = rating ? rating.value : 0.0
          this.rated = rating ? true : false;
        }
      });
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

  onChangeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
