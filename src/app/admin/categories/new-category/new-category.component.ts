import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { ImagePickerComponent } from './../../../shared/image-picker/image-picker.component';
import { DiscardChangesComponent } from './../../../shared/discard-changes/discard-changes.component';
import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from '../store/categories.actions';
import { Category } from './../../../models/category.model';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  created = false;
  creating = false;

  editMode = false;
  form: FormGroup;
  wasFormChanged = false;

  category: Category = null;

  languages = ['en', 'fr'];
  currentLang: string = null;


  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<NewCategoryComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, editMode: boolean },
    private translate:TranslateService
  ) { }


  ngOnInit(): void {
    this.editMode = this.data.editMode;
    this.currentLang = this.translate.currentLang;

    this.store.select('categories').subscribe(catState => {
      this.creating = catState.saving;
      this.created = catState.saved;

      if (this.editMode) {
        this.category = catState.categories.find(c => c.id === this.data.id);
      }
    });

    if (this.editMode) {
      this.form = new FormGroup({
        title_EN: new FormControl(this.category.title_EN, [Validators.required]),
        title_FR: new FormControl(this.category.title_FR),
        imagePath: new FormControl(this.category.imagePath, [Validators.required]),
        currentLang: new FormControl(this.currentLang)
      });
    }
    else {
      this.form = new FormGroup({
        title_EN: new FormControl(null, [Validators.required]),
        title_FR: new FormControl(null),
        imagePath: new FormControl(null, [Validators.required]),
        currentLang: new FormControl(this.currentLang)
      });
    }

  }

  onSubmit() {
    this.markAsDirty(this.form);

    if (!this.form.valid)
      return;

    if (this.editMode) {
      this.store.dispatch(new CategoriesActions.UpdateStart({
        id: this.category.id,
        title_En: this.form.value.title_EN,
        imagePath: this.form.value.imagePath,
        title_FR: this.form.value.title_FR
      }));

    } else {
      this.store.dispatch(new CategoriesActions.CreateStart({
        title_En: this.form.value.title_EN,
        imagePath: this.form.value.imagePath,
        title_FR: this.form.value.title_FR
      }));
    }

    // if (this.created)
    this.dialogRef.close();

  }

  formChanged() {
    this.wasFormChanged = true;
  }

  openDialog(): void {
    if (this.form.dirty) {
      const dialogRef = this.dialog.open(DiscardChangesComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
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

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }


  ngOnDestroy() {
    this.store.dispatch(new CategoriesActions.ClearErrors());
    this.store.dispatch(new CategoriesActions.ClearStatus());


  }

}
