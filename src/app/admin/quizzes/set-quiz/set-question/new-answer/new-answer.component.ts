import { Store } from '@ngrx/store';
import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImagePickerComponent } from '../../../../../shared/image-picker/image-picker.component';

import * as fromApp from '../../../../../store/app.reducer';
import * as QuizzesActions from '../../../store/quizzes.actions';
import { Answer } from './../../../../../models/answer.model';
import { TranslateService } from '@ngx-translate/core';

export interface DialogData {
  questionId?: number;
  answer?: Answer,
  editMode: boolean,
}

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;

  editMode = false;
  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  public Editor = ClassicEditor;

  errors: string[] = null;

  languages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<NewAnswerComponent>,
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
      isCorrect: new FormControl(false, [Validators.required]),
      currentLang: new FormControl(this.translate.currentLang)
    });

    this.store.select('quizzes').subscribe(state => {
      this.errors = state.errors;
      // if (state.questionUpdated) {
      //   this.dialogRef.close();
      // }
    });

    if (this.data.answer && this.data.editMode) {
      this.form.setValue({
        text_EN: this.data.answer.text_EN,
        text_FR: this.data.answer.text_FR,
        imagePath: this.data.answer.imagePath,
        isCorrect: this.data.answer.isCorrect,
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
      this.store.dispatch(new QuizzesActions.CreateAnswerStart({
        questionId: this.data.questionId,
        text_EN: this.form.value.text_EN,
        text_FR: this.form.value.text_FR,
        imagePath: this.form.value.imagePath,
        isCorrect: this.form.value.isCorrect
      }));
    } else {
      this.store.dispatch(new QuizzesActions.UpdateAnswerStart({
        id: this.data.answer.id,
        questionId: this.data.answer.questionId,
        text_EN: this.form.value.text_EN,
        text_FR: this.form.value.text_FR,
        imagePath: this.form.value.imagePath,
        isCorrect: this.form.value.isCorrect
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
