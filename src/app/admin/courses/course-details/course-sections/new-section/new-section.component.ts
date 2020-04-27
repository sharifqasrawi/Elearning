import { Store } from '@ngrx/store';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { DiscardChangesComponent } from './../../../../../shared/discard-changes/discard-changes.component';

import * as fromApp from '../../../../../store/app.reducer';
import * as CoursesActions from '../../../store/courses.actions';

export interface DialogData {
  courseId: number,
  editMode: boolean,
  sectionId?: number,
  name_EN?: string,
  order?: number
}

@Component({
  selector: 'app-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.css']
})
export class NewSectionComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;

  created = false;
  creating = false;

  editMode = false;
  form: FormGroup;
  wasFormChanged = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewSectionComponent>,
    private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnDestroy(): void {
    this.store.dispatch(new CoursesActions.ClearStatus());
  }


  ngOnInit(): void {
    this.editMode = this.data.editMode;
   
    if (!this.editMode) {
      this.form = new FormGroup({
        name_EN: new FormControl(null, [Validators.required]),
        order: new FormControl(this.data.order, [Validators.required])
      });
    }
    else {
      this.form = new FormGroup({
        name_EN: new FormControl(this.data.name_EN, [Validators.required]),
        order: new FormControl(this.data.order, [Validators.required])
      });
    }
  }


  onSubmit() {
    this.markAsDirty(this.form);

    if (!this.form.valid)
      return;

    if (this.editMode) {
      this.store.dispatch(new CoursesActions.UpdateSectionStart({
        course: {
          id: this.data.courseId
        },
        id: this.data.sectionId,
        name_EN: this.form.value.name_EN,
        order: this.form.value.order,
        action: 'edit'
      }));

    } else {
      this.store.dispatch(new CoursesActions.CreateSectionStart({
        course: {
          id: this.data.courseId
        },
        name_EN: this.form.value.name_EN,
        order: this.form.value.order,
        action: 'add'
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


}
