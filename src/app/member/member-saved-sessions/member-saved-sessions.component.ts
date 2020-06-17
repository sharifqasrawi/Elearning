import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { SavedSession } from './../../models/savedSession.model';

import * as fromApp from '../../store/app.reducer';
import * as MemberActions from '../store/member.actions';


@Component({
  selector: 'app-member-saved-sessions',
  templateUrl: './member-saved-sessions.component.html',
  styleUrls: ['./member-saved-sessions.component.css']
})
export class MemberSavedSessionsComponent implements OnInit {

  sessions: SavedSession[] = null;
  loading = false;

  currentLang:string=null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate:TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['DASHBOARD.SAVED_SESSIONS.SAVED_SESSIONS']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.SAVED_SESSIONS.SAVED_SESSIONS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.translate.get(['DASHBOARD.SAVED_SESSIONS.SAVED_SESSIONS']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.SAVED_SESSIONS.SAVED_SESSIONS']}`);
      });
    });

    
    this.store.dispatch(new MemberActions.FetchUserSavedSessionsStart());

    this.store.select('member').subscribe(state => {
      this.sessions = state.savedSessions;
      this.loading = state.loadingSavedSessions;

    });
  }

}
