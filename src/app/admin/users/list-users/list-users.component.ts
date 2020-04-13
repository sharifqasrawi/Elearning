import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { faListAlt, faSearch, faCheckCircle, faTimesCircle, faMale, faFemale, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { map } from 'rxjs/operators';

import * as fromApp from '../../../store/app.reducer';
import * as UsersActions from '../store/users.actions';
import { User } from './../../../models/user.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  faList = faListAlt;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faMale = faMale;
  faFemale = faFemale;
  faCheck = faCheck;
  faTimes = faTimes;

  colorPrimary: ThemePalette = 'primary';
  colorAccent: ThemePalette = 'accent';
  colorWarn: ThemePalette = 'warn';
  checked = false;

  subscription: Subscription
  users: User[] = null;
  usersCount = 0;
  errors = null;
  loading = false;
  loaded = false;
  updatingStatus = false;
  deleting = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.subscription = this.store.select('users')
      .subscribe(usersState => {
        this.loading = usersState.loading;
        this.users = usersState.users;
        this.usersCount = usersState.users.length;
        this.errors = usersState.errors;
        this.loaded = usersState.loaded;
        this.updatingStatus = usersState.settingActiveDeactive;
        this.deleting = usersState.deleting;
      });

    if (!this.loaded && !this.loading) {
      this.store.dispatch(new UsersActions.FetchStart());
    }
  }

  onSearch(event: KeyboardEvent) {
    const value = (<HTMLInputElement>event.target).value;

    // this.store.dispatch(new UsersActions.SearchStart(value));

    let usersList = [...this.users];
    this.store.select('users').pipe(
      map(usersState => usersState.users)
    ).subscribe(users => {
      usersList = [...users];
    })

    const searchResults = usersList.filter(u => {
      return (u.firstName.toLowerCase().includes(value.toLowerCase())
        || u.lastName.toLowerCase().includes(value.toLowerCase())
        || u.email.toLowerCase().includes(value.toLowerCase())
        || value == '');

    });

    this.users = searchResults;
  }

  onRefresh() {
    this.store.dispatch(new UsersActions.FetchStart());
  }

  onChangeStatus(userId: string, option: string) {
    this.store.dispatch(new UsersActions.SetActiveDeactiveStart({ userId: userId, option: option }));
  }

  onDelete(userId: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: 'Confirm delete', message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new UsersActions.DeleteStart(userId));
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.users = null;
    this.errors = null;
    this.loading = false;
    this.loaded = false;
    this.updatingStatus = false;
    this.deleting = false;
  }

}
