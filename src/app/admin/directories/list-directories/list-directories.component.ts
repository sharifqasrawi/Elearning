import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { NewDirectoryComponent } from '../new-directory/new-directory.component';

import * as fromApp from '../../../store/app.reducer';
import * as DirectoriesActions from '../store/directories.actions';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Directory } from './../../../models/directory.model';
import { PhysicalDirectoriesComponent } from '../physical-directories/physical-directories.component';

@Component({
  selector: 'app-list-directories',
  templateUrl: './list-directories.component.html',
  styleUrls: ['./list-directories.component.css']
})
export class ListDirectoriesComponent implements OnInit {

  faSearch = faSearch;

  directories: Directory[] = null;
  physicalDirectories: Directory[] = null;
  errors: string[] = null;
  loading = false;
  creating = false;

  count = 0;

  displayedColumns: string[] = ['id', 'name', 'path', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Directory>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new DirectoriesActions.FetchStart());

    this.store.select('directories').subscribe(dirState => {
      this.directories = dirState.directories;
      this.loading = dirState.loading;
      this.creating = dirState.creating;
      this.errors = dirState.errors;
      this.setTable();
    });

  }


  onEditDirectory() {
    const dialogRef = this.dialog.open(NewDirectoryComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.setTable();
    });
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
        this.store.dispatch(new DirectoriesActions.DeleteStart(id));
    });

  }

  onFetchPhysical(path: string) {
    const dialogRef = this.dialog.open(PhysicalDirectoriesComponent, {
      width: '700px',
      data: { path: path }
    });
  }

  onRefresh() {
    this.store.dispatch(new DirectoriesActions.FetchStart());
    this.setTable();
   
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.directories);
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


}
