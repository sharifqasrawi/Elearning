import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faQuestionCircle, faPlusCircle, faSearch, faCheck, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as QuizzesActions from '../store/quizzes.actions';
import { Quiz } from './../../../models/quiz.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-quizzes',
  templateUrl: './list-quizzes.component.html',
  styleUrls: ['./list-quizzes.component.css']
})
export class ListQuizzesComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;
  faEdit = faEdit;
  faTrash = faTrash;

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
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    if (this.currentLang === 'en') {
      this.displayedColumns = ['id', 'title_EN', 'isPublished', 'createdBy', 'createdAt', 'actions'];
    } else if (this.currentLang === 'fr') {
      this.displayedColumns = ['id', 'title_FR', 'isPublished', 'createdBy', 'createdAt', 'actions'];
    }

    this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['QUIZZES.QUIZZES']}`);
    });

    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      if (this.currentLang === 'en') {
        this.displayedColumns = ['id', 'title_EN', 'isPublished', 'createdBy', 'createdAt', 'actions'];
      } else if (this.currentLang === 'fr') {
        this.displayedColumns = ['id', 'title_FR', 'isPublished', 'createdBy', 'createdAt', 'actions'];
      }

      this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['QUIZZES.QUIZZES']}`);
      });
    });


    if (!this.quizzes)
      this.store.dispatch(new QuizzesActions.FetchQuizzesStart());

    this.store.select('quizzes').subscribe(state => {
      this.quizzes = state.quizzes;
      this.loadingQuizzes = state.loadingQuizzes;
      this.loadedQuizzes = state.loadedQuizzes;
      this.errors = state.errors;

      this.count = state.quizzes.length;
      this.setTable();
    });
  }


  onTrashQuiz(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.DELETE_CONFIRMATION', 'COMMON.TRASH_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.DELETE_CONFIRMATION'];
      alertMsg = trans['COMMON.TRASH_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new QuizzesActions.TrashRestoreQuizStart({
          id: id,
          action: 'trash'
        }));
      }

    });
  }


  onRefresh() {
    this.store.dispatch(new QuizzesActions.FetchQuizzesStart());
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
