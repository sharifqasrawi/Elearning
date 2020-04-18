import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faEnvelope, faEye, faEyeSlash, faSearch, faChessKing } from '@fortawesome/free-solid-svg-icons';

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
  faChessKing = faChessKing;


  messages: Message[] = null;
  loading = false;
  loaded = false;

  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'dateTime', 'isSeen', 'actions'];
  dataSource: MatTableDataSource<Message>;
  // selection = new SelectionModel<Message>(true, []);

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

  onSelect(id: number) {

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

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  //  /** Selects all rows if they are not all selected; otherwise clear selection. */
  //  masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Message): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  // }
}


