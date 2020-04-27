import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { DiscardChangesComponent } from './../../../../../shared/discard-changes/discard-changes.component';
import * as CoursesActions from './../../../store/courses.actions';

interface DialogData {
  editMode: boolean;
  order: number;
  sectionId?: number;
  courseId?: number;
  title_EN?: string;
  duration?: number;
  sessionId?: number
}

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit, OnDestroy {
  faPlusCircle = faPlusCircle;

  updated = false;
  updating = false;
  errors: string[] = null;

  editMode = false;
  form: FormGroup;
  wasFormChanged = false;


  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewSessionComponent>,
    private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnDestroy(): void {
    this.store.dispatch(new CoursesActions.ClearStatus());
  }



  ngOnInit(): void {
    this.editMode = this.data.editMode;

    this.store.select('courses').subscribe(state => {
      this.updating = state.updating;
      this.updated = state.updated;
      this.errors = state.errors;
    });

    if (!this.editMode) {
      this.form = new FormGroup({
        title_EN: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        order: new FormControl(this.data.order, [Validators.required])
      });
    }
    else {
      this.form = new FormGroup({
        title_EN: new FormControl(this.data.title_EN, [Validators.required]),
        duration: new FormControl(this.data.duration, [Validators.required]),
        order: new FormControl(this.data.order, [Validators.required])
      });
    }
  }

  onSubmit() {
    this.markAsDirty(this.form);

    if (!this.form.valid)
      return;

    if (this.editMode) {
      this.store.dispatch(new CoursesActions.UpdateSessionStart({
        id: this.data.sessionId,
        section: {
          id: this.data.sectionId,
          course: {
            id: this.data.courseId
          }
        },
        title_EN: this.form.value.title_EN,
        duration: this.form.value.duration,
        order: this.form.value.order,
        action: 'edit'
      }));
    } else {
      this.store.dispatch(new CoursesActions.CreateSessionStart({
        section: {
          id: this.data.sectionId,
          course: {
            id: this.data.courseId
          }
        },
        title_EN: this.form.value.title_EN,
        duration: this.form.value.duration,
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
