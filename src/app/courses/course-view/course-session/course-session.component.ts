import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faFileArchive, faDownload } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as HomeSessionActions from './store/session.actions';
import { Session } from './../../../models/session.model';

@Component({
  selector: 'app-course-session',
  templateUrl: './course-session.component.html',
  styleUrls: ['./course-session.component.css']
})
export class CourseSessionComponent implements OnInit {

  faFileArchive = faFileArchive;
  faDownload = faDownload;

  session: Session = null;
  sessionId: number = null;
  loading = false;
  errors: string[] = null;


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.sessionId = +params.sessionId;

      this.store.dispatch(new HomeSessionActions.FetchStart(this.sessionId));
    });


    this.store.select('homeSession').subscribe(state => {
      this.session = state.session;
      this.loading = state.loading;
      this.errors = state.errors;
    });
  }



  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}
