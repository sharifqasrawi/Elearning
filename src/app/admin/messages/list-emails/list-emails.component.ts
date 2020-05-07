import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import * as fromApp from '../../../store/app.reducer';
import * as MessagesActions from './../store/messages.actions';
import { EmailMessage } from './../../../models/emailMessage.model';

@Component({
  selector: 'app-list-emails',
  templateUrl: './list-emails.component.html',
  styleUrls: ['./list-emails.component.css']
})
export class ListEmailsComponent implements OnInit {

  faEnvelope = faEnvelope;
  faSearch = faSearch;

  messages: EmailMessage[] = null;

  errors: string[] = null;
  loading = false;
  loaded = false;

  displayedColumns: string[] = ['id', 'email', 'subject', 'dateTime', 'actions'];
  dataSource: MatTableDataSource<EmailMessage>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private snachBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    this.store.dispatch(new MessagesActions.FetchEmailsStart());

    this.store.select('messages').subscribe(messagesState => {
      this.messages = messagesState.emailMessages;
      this.loading = messagesState.loading;
      this.loaded = messagesState.loaded;
      this.errors = messagesState.errors;

      this.setTable();
    });

  }

  onRefresh() {
    this.store.dispatch(new MessagesActions.FetchEmailsStart());

    this.setTable();
    this.snachBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }

  private setTable() {
    this.dataSource = new MatTableDataSource(this.messages);
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
