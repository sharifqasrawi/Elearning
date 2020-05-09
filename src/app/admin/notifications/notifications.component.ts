import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { Notification } from './../../models/notification.model';
import * as fromApp from '../../store/app.reducer';
import * as NotificationsActions from './store/notifications.actions';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  faSearch = faSearch;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  notifications: Notification[] = null;
  loading = false;
  errors: string[] = null;


  displayedColumns: string[] = ['id', 'text', 'type', 'info', 'dateTime', 'isSeen', 'actions'];
  dataSource: MatTableDataSource<Notification>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new NotificationsActions.FetchStart());

    this.store.select('notifications').subscribe(state => {
      this.notifications = state.notifications;
      this.loading = state.loading;
      this.errors = state.errors;

      this.setTable();
    });
  }


  onRefresh() {
    this.store.dispatch(new NotificationsActions.FetchStart());
    this.setTable();
  }

  onChangeSeen(id: number) {

  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.notifications);
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
