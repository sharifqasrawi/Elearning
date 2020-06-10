import { Component, OnInit } from '@angular/core';
import { Directory } from '../../models/directory.model';
import { UploadedFile } from '../../models/uploadedFile.model';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import * as fromApp from '../../store/app.reducer';
import * as DirectoriesActions from '../../admin/directories/store/directories.actions';
import * as FilesActions from '../../admin/files/store/files.actions';

@Component({
  selector: 'app-video-picker',
  templateUrl: './video-picker.component.html',
  styleUrls: ['./video-picker.component.css']
})
export class VideoPickerComponent implements OnInit {


  directories: Directory[] = null;
  files: UploadedFile[] = null;
  allFiles: UploadedFile[] = null;
  path = '';
  selectedFile = null;

  constructor(
    public dialogRef: MatDialogRef<VideoPickerComponent>,
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


  isVideo = (type: string) => type === '.mp4' || type === '.mpeg' ;
}
