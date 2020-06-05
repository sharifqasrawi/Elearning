import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { faListAlt, faSearch, faCheckCircle, faTimesCircle, faMale, faFemale, faCheck, faTimes, faChessKing } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  faChessKing = faChessKing;

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
  searchValue:string = null;


  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'emailConfirmed',
    'country',
    'gender',
    'isAdmin',
    'isAuthor',
    'isActive',
    'createdAt',
    'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router
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

        this.setTable();
      });

    if (!this.loaded && !this.loading) {
      this.store.dispatch(new UsersActions.FetchStart());
    }
  }


  onRefresh() {
    this.store.dispatch(new UsersActions.FetchStart());
  }

  onChangeStatus(userId: string, option: string) {
    this.store.dispatch(new UsersActions.SetActiveDeactiveStart({ userId: userId, option: option }));

    let message = '';
    if (option === 'activate')
      message = 'Activating User';
    else
      message = 'Deactivating User';

  }

  onCreate() {
    this.router.navigate(['/admin', 'users', 'new-user']);
  }

  onDelete(userId: string) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.DELETE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.DELETE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new UsersActions.DeleteStart(userId));
      }
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



  private setTable() {

    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
