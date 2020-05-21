import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as CategoriesActions from '../categories/store/categories.actions';
import * as CoursesActions from '../courses/store/courses.actions';
import * as UsersActions from '../users/store/users.actions';
import * as MessagesActions from '../messages/store/messages.actions';
import * as DirectoriesActions from '../directories/store/directories.actions';
import * as FilesActions from '../files/store/files.actions';
import * as TagsActions from '../tags/store/tags.actions';
import * as ReportsActions from '../reports/store/reports.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token: string = null;

  categroiesCount = 0;
  usersCount = 0;
  messagesCount = 0;
  directoriesCount = 0;
  filesCount = 0;
  sentEmailsCount = 0;
  coursesCount = 0;
  tagsCount = 0;
  commentsCount = 0;
  likesCount = 0;
  reportsCount = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.getData();

    this.store.select('categories').pipe(map(state => state.categories.length)).subscribe(count => this.categroiesCount = count);

    this.store.select('courses').pipe(map(state => state.courses.length)).subscribe(count => this.coursesCount = count);

    this.store.select('users').pipe(map(state => state.users.length)).subscribe(count => this.usersCount = count);

    this.store.select('directories').pipe(map(state => state.directories.length)).subscribe(count => this.directoriesCount = count);

    this.store.select('files').pipe(map(state => state.files.length)).subscribe(count => this.filesCount = count);

    this.store.select('tags').pipe(map(state => state.tags.length)).subscribe(count => this.tagsCount = count);
   
    this.store.select('reports').pipe(map(state => state.reports.length)).subscribe(count => this.reportsCount = count);

    this.store.select('messages').subscribe(state => {
      this.messagesCount = state.messages.length; this.sentEmailsCount = state.emailMessages.length;
    });

    this.store.select('login').pipe(map(state => state.user.token)).subscribe(token => this.token = token);

    this.http.get<{ count: number }>(environment.API_BASE_URL + 'comments/count', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    }).subscribe(resData => this.commentsCount = resData.count, errorRes => { });

    this.http.get<{ count: number }>(environment.API_BASE_URL + 'likes/count', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    }).subscribe(resData => this.likesCount = resData.count, errorRes => { });
  }

  onRefresh() {
    this.getData();
  }

  getData() {
    this.store.dispatch(new CategoriesActions.FetchStart());
    this.store.dispatch(new CoursesActions.FetchStart());
    this.store.dispatch(new UsersActions.FetchStart());
    this.store.dispatch(new MessagesActions.FetchStart());
    this.store.dispatch(new MessagesActions.FetchEmailsStart());
    this.store.dispatch(new DirectoriesActions.FetchStart());
    this.store.dispatch(new FilesActions.FetchStart());
    this.store.dispatch(new TagsActions.FetchStart());
    this.store.dispatch(new ReportsActions.FetchStart());

    this.http.get<{ count: number }>(environment.API_BASE_URL + 'comments/count', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    }).subscribe(resData => this.commentsCount = resData.count, errorRes => { });

    this.http.get<{ count: number }>(environment.API_BASE_URL + 'likes/count', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    }).subscribe(resData => this.likesCount = resData.count, errorRes => { });
  }

}
