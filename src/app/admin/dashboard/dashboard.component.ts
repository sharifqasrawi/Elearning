import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as CategoriesActions from '../categories/store/categories.actions';
import * as CoursesActions from '../courses/store/courses.actions';
import * as UsersActions from '../users/store/users.actions';
import * as MessagesActions from '../messages/store/messages.actions';
import * as DirectoriesActions from '../directories/store/directories.actions';
import * as FilesActions from '../files/store/files.actions';
import * as TagsActions from '../tags/store/tags.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  categroiesCount = 0;
  usersCount = 0;
  messagesCount = 0;
  directoriesCount = 0;
  filesCount = 0;
  sentEmailsCount = 0;
  coursesCount = 0;
  tagsCount = 0;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(new CategoriesActions.FetchStart());
    this.store.dispatch(new CoursesActions.FetchStart());
    this.store.dispatch(new UsersActions.FetchStart());
    this.store.dispatch(new MessagesActions.FetchStart());
    this.store.dispatch(new MessagesActions.FetchEmailsStart());
    this.store.dispatch(new DirectoriesActions.FetchStart());
    this.store.dispatch(new FilesActions.FetchStart());
    this.store.dispatch(new TagsActions.FetchStart());

    this.store.select('categories')
      .pipe(
        map(state => state.categories.length)
      )
      .subscribe(count => {
        this.categroiesCount = count;
      });

    this.store.select('courses')
      .pipe(
        map(state => state.courses.length)
      )
      .subscribe(count => {
        this.coursesCount = count;
      });

    this.store.select('users')
      .pipe(
        map(state => state.users.length)
      )
      .subscribe(count => {
        this.usersCount = count;
      });

    this.store.select('messages')
      .subscribe(state => {
        this.messagesCount = state.messages.length;
        this.sentEmailsCount = state.emailMessages.length;
      });

    this.store.select('directories')
      .pipe(
        map(state => state.directories.length)
      )
      .subscribe(count => {
        this.directoriesCount = count;
      });

    this.store.select('files')
      .pipe(
        map(state => state.files.length)
      )
      .subscribe(count => {
        this.filesCount = count;
      });

      this.store.select('tags')
      .pipe(
        map(state => state.tags.length)
      )
      .subscribe(count => {
        this.tagsCount = count;
      });
  }

}
