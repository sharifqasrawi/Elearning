import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash, faCheckCircle, faTrashAlt, faPlusCircle, faReply } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { NewAnswerComponent } from './new-answer/new-answer.component';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import * as fromApp from '../../../../store/app.reducer';
import * as QuizzesActions from '../../store/quizzes.actions';
import { Question } from './../../../../models/question.model';
import { Answer } from './../../../../models/answer.model';

@Component({
  selector: 'app-set-question',
  templateUrl: './set-question.component.html',
  styleUrls: ['./set-question.component.css']
})
export class SetQuestionComponent implements OnInit, OnDestroy {

  faCheckCircle = faCheckCircle;
  faTrash = faTrash;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  faReply = faReply;

  question: Question = null;
  questionId: number = null;
  quizId: number = null;
  answers: Answer[] = null;
  loadingAs = false;

  currentLang: string = null;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private location: Location,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.currentLang = this.translate.currentLang);

    this.route.params.subscribe((params: Params) => {
      this.questionId = +params.questionId;
      this.quizId = +params.quizId;
    });

    this.store.dispatch(new QuizzesActions.FetchQuestionsStart(this.quizId));
    this.store.dispatch(new QuizzesActions.FetchAnswersStart(this.questionId));

    this.store.select('quizzes').subscribe(state => {
      this.question = state.questions.find(q => q.id === this.questionId);
      this.answers = state.answers;
      this.loadingAs = state.loadingAnswers;
    });

  }

  onBackToQuestions() {
    this.location.back();
  }


  onAddAnswer(questionId: number) {
    this.dialog.open(NewAnswerComponent, {
      width: '650px',
      disableClose: true,
      data: { editMode: false, questionId: questionId, answer: null }
    });
  }

  onEditAnswer(answer: Answer) {
    this.dialog.open(NewAnswerComponent, {
      width: '650px',
      disableClose: true,
      data: { editMode: true, answer: answer, questionId: null }
    });
  }

  onDeleteAnswer(answerId: number) {
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
        this.store.dispatch(new QuizzesActions.DeleteAnswerStart(answerId));
      }
    });
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);


  ngOnDestroy() {
    this.store.dispatch(new QuizzesActions.ClearErrors());
    this.store.dispatch(new QuizzesActions.ClearStatus());
  }
}
