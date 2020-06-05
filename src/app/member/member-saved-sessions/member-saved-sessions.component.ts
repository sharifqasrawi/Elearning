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


  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new MemberActions.FetchUserSavedSessionsStart());

    this.store.select('member').subscribe(state => {
      this.sessions = state.savedSessions;
      this.loading = state.loadingSavedSessions;

    });
  }

}
