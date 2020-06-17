import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { faUserEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as MemberActions from '../../store/member.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faUserEdit = faUserEdit;
  faEye = faEye;

  fullName: string = null;
  coursesCount: number = null;
  favoritesCount: number = null;
  savedSessionsCount: number = null;
  userQuizzesCount: number = null;
  loading = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate:TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['DASHBOARD.MY_DASHBOARD']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.MY_DASHBOARD']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['DASHBOARD.MY_DASHBOARD']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.MY_DASHBOARD']}`);
      });
    });

    this.store.select('login').subscribe(state => {
      if (state.user)
        this.fullName = `${state.user.firstName} ${state.user.lastName}`;
    });

    this.store.dispatch(new MemberActions.FetchDashboardInfoStart());

    this.store.select('member').subscribe(state => {
      this.loading = state.loadingDashboard;

      this.coursesCount = state.coursesCount;
      this.favoritesCount = state.favoritesCount;
      this.savedSessionsCount = state.savedSessionsCount;
      this.userQuizzesCount = state.userQuizzesCount;
    });
  }

}
