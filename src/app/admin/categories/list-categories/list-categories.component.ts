import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { faSearch, faCogs, faChessKing } from '@fortawesome/free-solid-svg-icons';


import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from '../store/categories.actions';
import { Category } from './../../../models/category.model';
import { NewCategoryComponent } from './../new-category/new-category.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  faSearch = faSearch;
  faCogs = faCogs;
  faChessKing = faChessKing;

  categories: Category[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;
  creating = false;
  created = false;
  deleting = false;

  count = 0;

  displayedColumns: string[] = ['id', 'imagePath', 'title_EN', 'slug', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoriesActions.FetchStart());

    this.store.select('categories').subscribe(catState => {
      this.categories = catState.categories;
      this.errors = catState.errors;
      this.loading = catState.loading;
      this.loaded = catState.loaded;
      this.creating = catState.saving;
      this.created = catState.saved;
      this.deleting = catState.deleting;

      this.count = catState.categories.length;
      this.setTableCategories();
    });


  }


  onRefresh() {
    this.store.dispatch(new CategoriesActions.FetchStart());
    this.setTableCategories();
    this.snackBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }


  onEditCategory(id?: number, editMode?: boolean) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '600px',
      disableClose: true,
      data: { id: id, editMode: editMode }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.setTableCategories();
    });
  }


  onTrash(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { header: 'Confirm Action', message: 'Move this category to trash ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoriesActions.TrashStart(id));
        this.snackBar.open('Moving to trash...', 'OK', {
          duration: 2000
        });
      }
    });
  }

  private setTableCategories() {

    this.dataSource = new MatTableDataSource(this.categories);
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


  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
}
