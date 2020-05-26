import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faQuestionCircle, faPlusCircle, faSearch, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  quizzes: Quiz[] = null;
  loadingQuizzes = false;
  loadedQuizzes = false;
  errors: string[] = null;

  count = 0;

  displayedColumns: string[] = ['id', 'title_EN', 'isPublished', 'deletedBy', 'deletedAt', 'actions'];
  dataSource: MatTableDataSource<Quiz>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirmation', message: 'Restore this quiz from trash ?' }
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirmation', message: 'Delete this quiz permanently ?' }
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
