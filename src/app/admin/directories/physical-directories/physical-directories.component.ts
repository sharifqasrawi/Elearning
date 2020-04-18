import { Store } from '@ngrx/store';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as fromApp from '../../../store/app.reducer';
import * as DirectoriesActions from '../store/directories.actions';
import { Directory } from './../../../models/directory.model';

@Component({
  selector: 'app-physical-directories',
  templateUrl: './physical-directories.component.html',
  styleUrls: ['./physical-directories.component.css']
})
export class PhysicalDirectoriesComponent implements OnInit {

  directories: Directory[] = null;
  loading = false;
  errors = null;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<PhysicalDirectoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { path: string }) { }

  ngOnInit(): void {
    this.store.dispatch(new DirectoriesActions.FetchPhysicalStart(this.data.path));

    this.store.select('directories').subscribe(dirState => {
      this.directories = dirState.physicalDirectories;
      this.loading = dirState.loadingPhysicalDirectories;
      this.errors = dirState.errorsPhysicalDirectories;
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
