import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faEnvelope, faEye, faEyeSlash, faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  faEdit = faEdit;
  faTrash = faTrash;


  messages: Message[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;

  displayedColumns: string[] = ['id', 'name', 'email', 'subject', 'dateTime', 'isSeen', 'actions'];
  dataSource: MatTableDataSource<Message>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    this.store.dispatch(new MessagesActions.FetchStart());

    this.store.select('messages').subscribe(messagesState => {
      this.messages = messagesState.messages;
      this.loading = messagesState.loading;
      this.loaded = messagesState.loaded;
      this.errors = messagesState.errors;

      this.setTable();
    });

  }

  onRefresh() {
    this.store.dispatch(new MessagesActions.FetchStart());

    this.setTable();
   
  }

  onSelect(id: number) {
    this.router.navigate(['admin', 'messages', id]);
  }

  onDelete(id: number) {
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
      if (result)
        this.store.dispatch(new MessagesActions.DeleteStart(id));
    });
  }

  onChangeSeen(id: number) {
    this.store.dispatch(new MessagesActions.ChangeSeenStart(id));
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


