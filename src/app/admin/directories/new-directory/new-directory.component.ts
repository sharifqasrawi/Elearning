import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { DiscardChangesComponent } from './../../../shared/discard-changes/discard-changes.component';
import * as fromApp from '../../../store/app.reducer';
import * as DirectoriesActions from '../store/directories.actions';
import { Directory } from './../../../models/directory.model';

@Component({
  selector: 'app-new-directory',
  templateUrl: './new-directory.component.html',
  styleUrls: ['./new-directory.component.css']
})
export class NewDirectoryComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  created = false;
  creating = false;

  editMode = false;
  form: FormGroup;
  wasFormChanged = false;
  listPaths: Directory[];


  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<NewDirectoryComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, editMode: boolean }) { }


  ngOnInit(): void {
    this.editMode = this.data.editMode;

    this.store.select('directories').subscribe(dirState => {
      this.listPaths = dirState.directories;
    });

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      path: new FormControl(null, [Validators.required]),
    });

  }

  onSubmit() {
    this.markAsDirty(this.form);

    if (!this.form.valid)
      return;

    this.store.dispatch(new DirectoriesActions.CreateStart({
      name: this.form.value.name,
      path: this.form.value.path,
    }));

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

  }

}
