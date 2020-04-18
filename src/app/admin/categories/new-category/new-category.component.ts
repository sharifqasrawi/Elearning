import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<NewCategoryComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, editMode: boolean }) { }


  ngOnInit(): void {
    this.editMode = this.data.editMode;

    this.store.select('categories').subscribe(catState => {
      this.creating = catState.saving;
      this.created = catState.saved;

      if (this.editMode) {
        this.category = catState.categories.find(c => c.id === this.data.id);
      }
    });

    if (this.editMode) {
      this.form = new FormGroup({
        title_EN: new FormControl(this.category.title_EN, [Validators.required])
      });
    }
    else {
      this.form = new FormGroup({
        title_EN: new FormControl(null, [Validators.required])
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
        title_En: this.form.value.title_EN
      }));

    } else {
      this.store.dispatch(new CategoriesActions.CreateStart({
        title_En: this.form.value.title_EN
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


  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }


  ngOnDestroy() {
    // this.store.dispatch(new CategoriesActions.ClearErrors());
    // this.store.dispatch(new CategoriesActions.ClearStatus());
  }

}
