import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImagePickerComponent } from '../../../shared/image-picker/image-picker.component';

import * as fromApp from '../../../store/app.reducer';
import * as QuizzesActions from '../store/quizzes.actions';
import { Quiz } from './../../../models/quiz.model';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.css']
})
export class NewQuizComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  faSave = faSave;

  editMode = false;

  quiz: Quiz = null;
  quizId: number = null;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;


  // Languages chip list
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  languages: string[] = [];

  public Editor = ClassicEditor;

  loading = false;
  quizCreating = false;
  quizCreated = false;
  quizUpdating = false;
  quizUpdated = false;

  siteLanguages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private titleService:Title
  ) { }


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['QUIZZES.QUIZZES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['QUIZZES.QUIZZES']}`);
      });
    });


    this.form = new FormGroup({
      title_EN: new FormControl(null, [Validators.required]),
      description_EN: new FormControl(null, [Validators.required]),
      title_FR: new FormControl(null),
      description_FR: new FormControl(null),
      languages: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      currentLang: new FormControl(this.translate.currentLang)
    });

    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.id;
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.editMode = params.editMode;
    });


    this.store.select('quizzes').subscribe(state => {
      this.quiz = state.quizzes.find(q => q.id === this.quizId);

      this.quizCreating = state.quizCreating;
      this.quizCreated = state.quizCreated;
      this.quizUpdating = state.quizUpdating;
      this.quizUpdated = state.quizUpdated;
      this.loading = state.loadingQuizzes;

      if (this.quiz) {
        this.form.setValue({
          title_EN: this.quiz.title_EN,
          description_EN: this.quiz.description_EN,
          title_FR: this.quiz.title_FR,
          description_FR: this.quiz.description_FR,
          languages: this.quiz.languages,
          duration: this.quiz.duration,
          imagePath: this.quiz.imagePath,
          currentLang: this.translate.currentLang
        });

        this.languages = this.quiz.languages.split('-');
      }

      if (this.quizCreated || this.quizUpdated) {
        this.router.navigate(['/admin', 'quizzes']);
      }
    });

    if (!this.quiz) {
      this.store.dispatch(new QuizzesActions.FetchQuizzesStart());
    }
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new QuizzesActions.CreateQuizStart({
        title_EN: this.form.value.title_EN,
        description_EN: this.form.value.description_EN,
        title_FR: this.form.value.title_FR,
        description_FR: this.form.value.description_FR,
        duration: this.form.value.duration,
        imagePath: this.form.value.imagePath,
        languages: this.languages.join('-')
      }));
    }
    else {
      this.store.dispatch(new QuizzesActions.UpdateQuizStart({
        id: this.quizId,
        title_EN: this.form.value.title_EN,
        description_EN: this.form.value.description_EN,
        title_FR: this.form.value.title_FR,
        description_FR: this.form.value.description_FR,
        duration: this.form.value.duration,
        imagePath: this.form.value.imagePath,
        languages: this.languages.join('-')
      }));
    }

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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.languages.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(lang: string): void {
    const index = this.languages.indexOf(lang);

    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new QuizzesActions.ClearErrors());
    this.store.dispatch(new QuizzesActions.ClearStatus());
    this.editMode = false;
  }
}
