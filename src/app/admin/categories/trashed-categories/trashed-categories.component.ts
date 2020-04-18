import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { faSearch, faTrashAlt, faChessKing } from '@fortawesome/free-solid-svg-icons';


import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from '../store/categories.actions';
import { Category } from './../../../models/category.model';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-trashed-categories',
  templateUrl: './trashed-categories.component.html',
  styleUrls: ['./trashed-categories.component.css']
})
export class TrashedCategoriesComponent implements OnInit {

  faSearch = faSearch;
  faTrashAlt = faTrashAlt;
  faChessKing = faChessKing;

  trashedCategories: Category[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;
  deleting = false;

  count = 0;

  displayedColumns: string[] = ['id', 'title_EN', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoriesActions.FetchDeletedStart());

    this.store.select('categories').subscribe(catState => {
      this.trashedCategories = catState.trashedCategories;
      this.errors = catState.errors;
      this.loading = catState.loading;
      this.loaded = catState.loaded;
      this.deleting = catState.deleting;

      this.count = catState.trashedCategories.length;

      this.setTableTrashedCategories();
    });


  }


  onRefresh() {
    this.store.dispatch(new CategoriesActions.FetchDeletedStart());
    this.setTableTrashedCategories();
    this.snackBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }


  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirm Delete', message: 'Delete this category ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoriesActions.DeleteStart(id));
        this.snackBar.open('Deleting...', 'OK', {
          duration: 2000
        });
      }
    });
  }


  onRestore(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirm Restore', message: 'Restore this category from trash ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoriesActions.RestoreStart(id));
        this.snackBar.open('Restoring from trash...', 'OK', {
          duration: 2000
        });
      }
    });
  }



  private setTableTrashedCategories() {
    this.dataSource = new MatTableDataSource(this.trashedCategories);
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
