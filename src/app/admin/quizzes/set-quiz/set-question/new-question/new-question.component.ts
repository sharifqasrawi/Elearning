import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImagePickerComponent } from '../../../../../shared/image-picker/image-picker.component';

import * as fromApp from '../../../../../store/app.reducer';
import * as QuizzesActions from '../../../store/quizzes.actions';
import { Question } from './../../../../../models/question.model';

export interface DialogData {
  quizId?: number;
  question?: Question,
  editMode: boolean,
}

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;

  editMode = false;
  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  public Editor = ClassicEditor;

  loading = false;

  languages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<NewQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.form = new FormGroup({
      text_EN: new FormControl(null, [Validators.required]),
      text_FR: new FormControl(null),
      imagePath: new FormControl(null),
      duration: new FormControl(null, [Validators.required]),
      currentLang: new FormControl(this.translate.currentLang)
    });

    this.store.select('quizzes').subscribe(state => {
      this.loading = state.loadingQuestions;
      // if (state.questionCreated || state.questionUpdated) {
      //   this.dialogRef.close();
      // }
    });

    if (this.data.question && this.data.editMode) {
      this.form.setValue({
        text_EN: this.data.question.text_EN,
        text_FR: this.data.question.text_FR,
        imagePath: this.data.question.imagePath,
        duration: this.data.question.duration,
        currentLang: this.translate.currentLang
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.data.editMode) {
      this.store.dispatch(new QuizzesActions.CreateQuestionStart({
        quizId: this.data.quizId,
        text_EN: this.form.value.text_EN,
        text_FR: this.form.value.text_FR,
        imagePath: this.form.value.imagePath,
        duration: this.form.value.duration
      }));
    } else {
      this.store.dispatch(new QuizzesActions.UpdateQuestionStart({
        id: this.data.question.id,
        text_EN: this.form.value.text_EN,
        text_FR: this.form.value.text_FR,
        imagePath: this.form.value.imagePath,
        duration: this.form.value.duration
      }));
    }
    this.dialogRef.close();
  }

  selectImage() {
    var dialogRef = this.dialog.open(ImagePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { imagePath: string }) => {
      if (data) {
        this.form.patchValue({
          imagePath: data.imagePath
        });
      }
    });

  }

  onChangeLang() {
    const lang = this.form.value.currentLang;

    this.currentLang = lang;
  }

  ngOnDestroy() {
    this.store.dispatch(new QuizzesActions.ClearErrors());
    this.store.dispatch(new QuizzesActions.ClearStatus());
  }
}
