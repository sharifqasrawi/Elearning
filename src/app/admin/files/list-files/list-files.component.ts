import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { Directory } from './../../../models/directory.model';
import { UploadedFile } from './../../../models/uploadedFile.model';

import * as fromApp from '../../../store/app.reducer';
import * as FilesActions from '../store/files.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {

  faUpload = faUpload;

  listPaths: Directory[] = null;
  path: string = null;

  files: UploadedFile[] = null;
  loading = false;
  loaded = false;
  errorsDir: string[] = null;
  errorsFiles: string[] = null;


  constructor(
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new FilesActions.FetchStart());

    this.store.select('directories').subscribe(dirState => {
      this.listPaths = dirState.directories;
      this.errorsDir = dirState.errors;
    });

    this.store.select('files').subscribe(filesState => {
      this.files = filesState.files;
      this.errorsFiles = filesState.errors;
      this.loading = filesState.loading;
      this.loaded = filesState.loaded;
    });
  }


  onSelectDirectory() {
    // this.files.filter(f => {
    //   return f.uploadDirectory.path !== this.path
    // });
  }

  getImage(imagePath) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  }

  isImage(fileType: string): boolean {
    return fileType === '.jpg' || fileType === '.jpeg' || fileType === '.png' || fileType === '.gif';
  }

  isPdf(fileType: string): boolean {
    return fileType === '.pdf';
  }
}
