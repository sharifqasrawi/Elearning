import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { ImagePickerComponent } from './../../../shared/image-picker/image-picker.component';
import { Category } from './../../../models/category.model';
import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from '../../categories/store/categories.actions';
import * as CoursesActions from '../store/courses.actions';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styles: ['./new-course.component.css'],
})
export class NewCourseComponent implements OnInit {

  foralaButtonOptions = {
    'moreText': {
      'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
    },
    'moreParagraph': {
      'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
    },
    'moreRich': {
      'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
    },
    'moreMisc': {
      'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'selectAll', 'html', 'help']
    },
  };

  froalaOptions = {
    heightMin: 150,
    placeholderText: 'Enter course description',
    toolbarButtons: { ...this.foralaButtonOptions }
  };
  froalaOptions2 = {
    heightMin: 150,
    placeholderText: 'Enter course prerequisites',
    toolbarButtons: { ...this.foralaButtonOptions }
  };

  colorPrimary: ThemePalette = 'primary';
  colorAccent: ThemePalette = 'accent';
  colorWarn: ThemePalette = 'warn';
  checkedPub = false;
  checkedFree = true;

  form: FormGroup;
  creating = false;
  created = false;

  // Languages chip list
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  languages: string[] = [];


  listCategories: Category[] = null;
  listLevels = ['Basic', 'Medium', 'Advanced'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<fromApp.AppState>

  ) { }

  ngOnInit(): void {

    this.store.dispatch(new CategoriesActions.FetchStart());

    this.store.select('categories')
      .pipe(map(state => state.categories))
      .subscribe(categories => {
        this.listCategories = categories;
      });

    this.store.select('courses')
      .subscribe(state => {
        this.creating = state.creating;
        this.created = state.created;
      });

    this.form = new FormGroup({
      title_EN: new FormControl(null, [Validators.required]),
      description_EN: new FormControl(null, [Validators.required]),
      prerequisites_EN: new FormControl(null, [Validators.required]),
      languages: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      price: new FormControl(this.checkedFree ? '0.0' : null, [Validators.required]),
      isFree: new FormControl(this.checkedFree, [Validators.required]),
      isPublished: new FormControl(null),
      category: new FormControl(null, [Validators.required])
    });

  }


  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new CoursesActions.CreateStart({
      title_EN: this.form.value.title_EN,
      description_EN: this.form.value.description_EN,
      prerequisites_EN: this.form.value.prerequisites_EN,
      languages: this.languages.join('-'),
      level: this.form.value.level,
      imagePath: this.form.value.imagePath,
      category: this.form.value.category,
      duration: this.form.value.duration,
      isFree: this.form.value.isFree,
      price: this.form.value.price,
      isPublished: this.form.value.isPublished
    }));
  }


  onCancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '300px',
        data: { header: 'Confirmation', message: 'Discard all changes and exit ?' }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/admin', 'courses']);
    });
  }

  selectImage() {
    var dialogRef = this.dialog.open(ImagePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { imagePath: string }) => {
      this.form.patchValue({
        imagePath: data.imagePath
      });
    });
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

}
