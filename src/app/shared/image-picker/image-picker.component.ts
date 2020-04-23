import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import * as fromApp from '../../store/app.reducer';
import * as DirectoriesActions from '../../admin/directories/store/directories.actions';
import * as FilesActions from '../../admin/files/store/files.actions';
import { Directory } from './../../models/directory.model';
import { UploadedFile } from './../../models/uploadedFile.model';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {

  directories: Directory[] = null;
  files: UploadedFile[] = null;
  allFiles: UploadedFile[] = null;
  path = '';
  selectedImage = null;

  constructor(
    public dialogRef: MatDialogRef<ImagePickerComponent>,
    private store: Store<fromApp.AppState>
  ) { }


  ngOnInit(): void {
    this.store.dispatch(new DirectoriesActions.FetchStart());
    this.store.dispatch(new FilesActions.FetchStart());

    this.store.select('directories')
      .pipe(map(state => state.directories))
      .subscribe(dirs => {
        this.directories = dirs
      });

    this.store.select('files')
      .pipe(map(state => state.images))
      .subscribe(images => {
        this.allFiles = images;
        this.files = this.allFiles;
      });
  }

  onChoose() {
    this.dialogRef.close({ imagePath: this.selectedImage });
  }

  onSelectImage(image: string) {
    this.selectedImage = image;
  }

  onClear() {
    this.selectedImage = null;
  }

  onSelectDirectory() {
    if (this.path !== undefined) {
      const filteredFiles = this.allFiles.filter(f => f.uploadDirectory.path === this.path);
      this.files = filteredFiles;
    }
    else {
      this.files = this.allFiles;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
