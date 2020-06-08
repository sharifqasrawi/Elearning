import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faPlusCircle, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';


import { SessionContent } from './../../../../../models/sessionContent.model';
import { ConfirmDialogComponent } from './../../../../../shared/confirm-dialog/confirm-dialog.component';
import { NewContentComponent } from './new-content/new-content.component';
import * as fromApp from '../../../../../store/app.reducer';
import * as SessionsActions from '../store/sessions.actions';
import * as SessionContentsActions from '../session-content/store/session-contents.actions';

import { Session } from './../../../../../models/session.model';

@Component({
  selector: 'app-session-content',
  templateUrl: './session-content.component.html',
  styleUrls: ['./session-content.component.css']
})
export class SessionContentComponent implements OnInit, OnDestroy {

  lang: string = '';
  codeViewerOptions = {
    theme: 'vs-dark', language: this.lang, readOnly: true, scrollBeyondLastLine: false
  };


  faEdit = faEdit;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  editedSession: Session = null;
  editedSessionId: number;
  contents: SessionContent[] = null;
  errors: string[] = null;

  loadingSession = false;
  loadingContents = false;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private location: Location,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
    });

    this.route.params.subscribe((params: Params) => {
      this.editedSessionId = +params.id;

      this.store.dispatch(new SessionsActions.FetchStart(+params.sectionId));
    });


    this.store.select('sessions').subscribe(state => {
      this.editedSession = state.sessions.find(s => s.id === this.editedSessionId);
      this.loadingSession = state.loading;
    });

    this.store.dispatch(new SessionContentsActions.FetchStart(this.editedSessionId));

    this.store.select('sessionContents').subscribe(state => {
      this.contents = state.contents;
      this.errors = state.errors;
      this.loadingContents = state.loading;

      if (state.created) {
        this.toastr.success('New content added', 'Success');
        this.store.dispatch(new SessionContentsActions.ClearStatus());
      }
    });

  }


  onAdd() {
    let maxOrder = -1;
    if (this.contents.length > 0)
      maxOrder = Math.max.apply(Math, [...this.contents.filter(c => c.type !== 'resource')].map(s => s.order));

    this.dialog.open(NewContentComponent, {
      width: '750px',
      disableClose: true,
      data: {
        editMode: false,
        editedSessionId: this.editedSessionId,
        order: maxOrder + 1
      }
    });
  }

  onRefresh() {
    this.store.dispatch(new SessionContentsActions.FetchStart(this.editedSessionId));
  }


  onEditContent(contentId: number, contentOrder: number, contentType: string, content: string, content_FR: string, note: string) {

    this.dialog.open(NewContentComponent, {
      width: '750px',
      disableClose: true,
      data: {
        editMode: true,
        editedSessionId: this.editedSessionId,
        order: contentOrder,
        type: contentType,
        content: content,
        content_FR: content_FR,
        id: contentId,
        note: note
      }
    });
  }


  onDeleteContent(contentId: number) {
    let alertHeader = '';
    let alertMsg = '';
    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.DELETE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.DELETE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        data: { header: alertHeader, message: alertMsg }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new SessionContentsActions.DeleteStart(contentId));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new SessionContentsActions.ClearErrors());
    this.store.dispatch(new SessionContentsActions.ClearStatus());
  }



  onGoBack() {
    this.location.back();
  }

  getSanitizedHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getSanitizedImage(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  }
}
