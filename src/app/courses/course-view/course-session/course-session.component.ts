import { ErrorDialogComponent } from './../../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faFileArchive, faDownload } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as HomeSessionActions from './store/session.actions';
import * as MemberActions from '../../../member/store/member.actions';
import { Session } from './../../../models/session.model';
import { SavedSession } from './../../../models/savedSession.model';

@Component({
  selector: 'app-course-session',
  templateUrl: './course-session.component.html',
  styleUrls: ['./course-session.component.css']
})
export class CourseSessionComponent implements OnInit {

  codeViewerOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    readOnly: true,
    scrollBeyondLastLine: false
  };

  faFileArchive = faFileArchive;
  faDownload = faDownload;

  isAuthenticated = false;

  session: Session = null;
  sessionId: number = null;
  loading = false;
  errors: string[] = null;

  savedSession: SavedSession;
  savingSession = false;
  savedSessionState = false;
  loadingSavedSessions = false;
  loadedSavedSessions = false;

  saveChecked = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.select('login')
      .pipe(map(state => state.isAuthenticated))
      .subscribe(isAuth => this.isAuthenticated = isAuth);


    this.route.params.subscribe((params: Params) => {
      this.sessionId = +params.sessionId;

      this.store.dispatch(new HomeSessionActions.FetchStart(this.sessionId));

      this.store.select('homeSession').subscribe(state => {
        this.session = state.session;
        this.loading = state.loading;
        this.errors = state.errors;
      });

      if (this.isAuthenticated) {
        this.store.dispatch(new MemberActions.FetchSavedSessionsStart());

        this.store.select('member').subscribe(state => {
          this.savedSession = state.savedSessions.find(s => s.sessionId === this.sessionId);

          this.savingSession = state.savingSession;
          this.savedSessionState = state.savedSession;
          this.loadingSavedSessions = state.loadingSavedSessions;
          this.loadedSavedSessions = state.loadedSavedSessions;

          // if (state.errors) {
          //   this.dialog.open(ErrorDialogComponent, {
          //     width: '450px',
          //     data: { errors: state.errors }
          //   });
          // }

          this.saveChecked = this.savedSession ? true : false;
          // this.saveChecked = state.savedSession;
        });
      }
    });
  }

  onSaveSession() {
    if (!this.saveChecked) {
      const url = this.router.url;
      this.store.dispatch(new MemberActions.SaveSessionStart({ sessionId: this.sessionId, sessionUrl: url }));
    } else {
      this.store.dispatch(new MemberActions.RemoveSessionStart(this.savedSession.id))
    }

    // this.saveChecked = !this.saveChecked;
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}
