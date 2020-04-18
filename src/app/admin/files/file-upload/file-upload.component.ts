import { HttpRequest, HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

import { environment } from './../../../../environments/environment';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Directory } from './../../../models/directory.model';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  faUpload = faUpload;

  files: any[] = [];
  listPaths: Directory[] = null;
  path: string = null;
  uploading = false;
  uploaded = false;
  errors: string[] = null;
  progress = 0;
  token = null;

  test: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

    this.store.select('directories').subscribe(dirState => {
      this.listPaths = dirState.directories;
    });

    this.store.select('login')
      .pipe(
        map(authState => authState.user)
      )
      .subscribe(user => {
        this.token = user.token;
      });

  }



  onUpload() {
    if (this.files.length === 0)
      return;

    const formData = new FormData();

    for (let file of this.files)
      formData.append(file.name, file);


    const uploadRequest = new HttpRequest(
      'POST',
      environment.API_BASE_URL + 'files/upload',
      formData,
      {
        reportProgress: true,
        params: new HttpParams().set('directory', this.path),
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      });


    this.http.request(uploadRequest).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);

        this.uploading = true;
        this.uploaded = false;
        this.errors = null;
      }
      else if (event.type === HttpEventType.Response) {
        this.uploading = false;
        this.uploaded = true;
        this.files = [];
      }
    },
      errorRes => {
        this.errors = errorRes.error.errors;
        this.uploading = false;
      }
    );
  }



  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
    this.uploaded = false;
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
    this.uploaded = false;
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    // this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onCancel() {
    if (this.files.length > 0 || this.path !== null) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '200px',
        data: { header: 'Confirm Cancel', message: 'Exit file upload ?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.router.navigate(['/admin', 'files']);
      });
    } else {
      this.router.navigate(['/admin', 'files']);
    }

  }
}
