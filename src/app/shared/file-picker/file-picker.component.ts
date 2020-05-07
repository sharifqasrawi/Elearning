import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Directory } from './../../models/directory.model';
import { UploadedFile } from './../../models/uploadedFile.model';

import * as fromApp from '../../store/app.reducer';
import * as DirectoriesActions from '../../admin/directories/store/directories.actions';
import * as FilesActions from '../../admin/files/store/files.actions';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent implements OnInit {


  directories: Directory[] = null;
  files: UploadedFile[] = null;
  allFiles: UploadedFile[] = null;
  path = '';
  selectedFile = null;

  constructor(
    public dialogRef: MatDialogRef<FilePickerComponent>,
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
      .pipe(map(state => state.files))
      .subscribe(files => {
        this.allFiles = files;
        this.files = this.allFiles;
      });
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

  onChoose() {
    this.dialogRef.close({ filePath: this.selectedFile });
  }

  onSelectImage(file: string) {
    this.selectedFile = file;
  }

  onClear() {
    this.selectedFile = null;
  }


  isImage = (type: string) => type === '.jpg' || type === '.jpeg' || type === '.png' || type === '.gif';
  isPdf = (type: string) => type === '.pdf';
  isRar = (type: string) => type === '.rar';
  isZip = (type: string) => type === '.zip';

  isOther = (type: string) => !this.isImage(type) && !this.isPdf(type) && !this.isRar(type) && !this.isZip(type);
}
