import { TranslateService } from '@ngx-translate/core';
import { PdfViewerModalComponent } from './../../../shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { ImgViewerComponent } from './../../../shared/img-viewer/img-viewer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faUpload, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Directory } from './../../../models/directory.model';
import { UploadedFile } from './../../../models/uploadedFile.model';

import * as fromApp from '../../../store/app.reducer';
import * as FilesActions from '../store/files.actions';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {

  faUpload = faUpload;
  faSearch = faSearch;

  listPaths: Directory[] = null;
  path: string = null;

  files: UploadedFile[] = null;
  loading = false;
  loaded = false;
  errorsDir: string[] = null;
  errorsFiles: string[] = null;

  count = 0;

  displayedColumns: string[] = ['id', 'downloadPath', 'originalFileName', 'uploadDirectory', 'fileType', 'uploadDateTime', 'actions'];
  dataSource: MatTableDataSource<UploadedFile>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private translate:TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    
    this.translate.get(['ADMINISTRATION.FILE_MANAGEMENT.FILES']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.FILE_MANAGEMENT.FILES']}`);
    });
    this.translate.onLangChange.subscribe(() => {

      this.translate.get(['ADMINISTRATION.FILE_MANAGEMENT.FILES']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.FILE_MANAGEMENT.FILES']}`);
      });
    });

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
      this.setTable(this.files);
    });

  }


  onRefresh() {
    this.store.dispatch(new FilesActions.FetchStart());
    this.setTable(this.files);
  }

  onSelectDirectory() {
    if (this.path !== undefined) {
      const filteredFiles = this.files.filter(f => f.uploadDirectory.path === this.path);
      this.setTable(filteredFiles);
    }
    else {
      this.setTable(this.files);
    }
  }

  onDelete(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.DELETE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.DELETE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new FilesActions.DeleteStart(id));
    });

  }

  onViewImage(downloadPath: string) {
    const dialogRef = this.dialog.open(ImgViewerComponent, {
      data: { path: downloadPath },
      panelClass: ['no-padding', 'no-scrolls'],
      backdropClass: 'backdropBg',
    });
  }

  onViewPdfFile(downloadPath: string) {
    const dialogRef = this.dialog.open(PdfViewerModalComponent, {
      data: { filePath: downloadPath },
      panelClass: ['no-padding', 'no-scrolls'],
      backdropClass: 'backdropBg',
    });
  }

  private setTable(table: UploadedFile[]) {

    this.dataSource = new MatTableDataSource(table);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
