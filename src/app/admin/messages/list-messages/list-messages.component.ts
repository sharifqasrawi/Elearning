import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faEnvelope, faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as MessagesActions from './../store/messages.actions';
import { Message } from './../../../models/message.model';


@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {

  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSearch = faSearch;


  messages: Message[] = null;
  loading = false;
  loaded = false;

  displayedColumns: string[] = ['id', 'name', 'email', 'subject' ,'dateTime', 'isSeen'];
  dataSource: MatTableDataSource<Message>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private snachBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

    this.store.dispatch(new MessagesActions.FetchStart());

    this.store.select('messages').subscribe(messagesState => {
      this.messages = messagesState.messages;
      this.loading = messagesState.loading;
      this.loaded = messagesState.loaded;
    });

    this.setTable();
  }

  onRefresh() {
    this.store.dispatch(new MessagesActions.FetchStart());

    this.setTable();
    this.snachBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }

  onSelect(id: number){
    
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


