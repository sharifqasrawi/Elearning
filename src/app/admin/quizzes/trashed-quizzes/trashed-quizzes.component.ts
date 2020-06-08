import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faQuestionCircle, faPlusCircle, faSearch, faCheck, faTimes, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as QuizzesActions from '../store/quizzes.actions';
import { Quiz } from '../../../models/quiz.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-trashed-quizzes',
  templateUrl: './trashed-quizzes.component.html',
  styleUrls: ['./trashed-quizzes.component.css']
})
export class TrashedQuizzesComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;
  faTrash = faTrash;
  faReply = faReply;

  quizzes: Quiz[] = null;
  loadingQuizzes = false;
  loadedQuizzes = false;
  errors: string[] = null;

  count = 0;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Quiz>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    if (this.currentLang === 'en') {
      this.displayedColumns = ['id', 'title_EN', 'isPublished', 'deletedBy', 'deletedAt', 'actions'];
    } else if (this.currentLang === 'fr') {
      this.displayedColumns = ['id', 'title_FR', 'isPublished', 'deletedBy', 'deletedAt', 'actions'];
    }
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      if (this.currentLang === 'en') {
        this.displayedColumns = ['id', 'title_EN', 'isPublished', 'deletedBy', 'deletedAt', 'actions'];
      } else if (this.currentLang === 'fr') {
        this.displayedColumns = ['id', 'title_FR', 'isPublished', 'deletedBy', 'deletedAt', 'actions'];
      }
    });

    this.store.dispatch(new QuizzesActions.FetchTrashedQuizzesStart());

    this.store.select('quizzes').subscribe(state => {
      this.quizzes = state.trashedQuizzes;
      this.loadingQuizzes = state.loadingQuizzes;
      this.loadedQuizzes = state.loadedQuizzes;
      this.errors = state.errors;

      this.count = state.trashedQuizzes.length;
      this.setTable();
    });
  }


  onRestoreQuiz(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.RESTORE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.RESTORE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new QuizzesActions.TrashRestoreQuizStart({
          id: id,
          action: 'restore'
        }));
      }

    });
  }

  onDeleteQuiz(id: number) {
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
        this.store.dispatch(new QuizzesActions.DeleteQuizStart(id));
      }

    });
  }


  onRefresh() {
    this.store.dispatch(new QuizzesActions.FetchTrashedQuizzesStart());
    this.setTable();
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.quizzes);
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
