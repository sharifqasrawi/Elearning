import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlusCircle, faEdit, faQuestionCircle, faSearch, faTrash, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NewQuestionComponent } from '../new-question/new-question.component';

import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';

import * as fromApp from '../../../../../store/app.reducer';
import * as QuizzesActions from '../../../store/quizzes.actions';
import { Quiz } from '../../../../../models/quiz.model';
import { Question } from '../../../../../models/question.model';

@Component({
  selector: 'app-questions-landing-page',
  templateUrl: './questions-landing-page.component.html',
  styleUrls: ['./questions-landing-page.component.css']
})
export class QuestionsLandingPageComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faQuestionCircle = faQuestionCircle;
  faSearch = faSearch;
  faTrash = faTrash;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;

  colorAccent: ThemePalette = 'accent';

  quiz: Quiz = null;
  quizId: number = null;
  loading = false;
  loaded = false;
  questions: Question[] = null;
  loadingQs = false;
  loadedQs = false;
  publishing = false;
  errors: string[] = null;


  count = 0;

  displayedColumns: string[] = ['id', 'text_EN', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy', 'actions'];
  dataSource: MatTableDataSource<Question>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
    });

    this.store.dispatch(new QuizzesActions.FetchQuestionsStart(this.quizId));

    this.store.select('quizzes').subscribe(state => {
      this.questions = state.questions;
      this.loadingQs = state.loadingQuestions;

      this.loadedQs = state.loadedQuestions;
      this.errors = state.errors;

      this.setTable();
    });
  }


  onAddQuestion() {
    this.dialog.open(NewQuestionComponent, {
      width: '650px',
      disableClose: true,
      data: { quizId: this.quizId, editMode: false, question: null }
    });
  }

  onEditQuestion(question: Question) {
    this.dialog.open(NewQuestionComponent, {
      width: '650px',
      disableClose: true,
      data: { question: question, editMode: true, quizId: null }
    });
  }


  onTrashQuestion(questionId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirmation', message: 'Move this question to trash ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new QuizzesActions.TrashRestoreQuestionStart({ id: questionId, action: 'trash' }));
    });
  }

  onRestoreQuestion(questionId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirmation', message: 'Restore this question from trash ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new QuizzesActions.TrashRestoreQuestionStart({ id: questionId, action: 'restore' }));
    });
  }

  onDeleteQuestion(questionId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirmation', message: 'Delete this question permanently ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new QuizzesActions.DeleteQuestionStart(questionId));
      }
    });
  }


  onRefresh() {
    this.store.dispatch(new QuizzesActions.FetchQuestionsStart(this.quizId));
    this.setTable();

  }

  private setTable() {
    this.dataSource = new MatTableDataSource(this.questions);
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


  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getPlainText = (html: string) => html.replace(/<[^>]*>/g, '');
}