import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { faSearch, faTrashAlt, faChessKing, faTimes, faReply } from '@fortawesome/free-solid-svg-icons';


import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from '../store/categories.actions';
import { Category } from './../../../models/category.model';

@Component({
  selector: 'app-trashed-categories',
  templateUrl: './trashed-categories.component.html',
  styleUrls: ['./trashed-categories.component.css']
})
export class TrashedCategoriesComponent implements OnInit {

  faSearch = faSearch;
  faTrashAlt = faTrashAlt;
  faChessKing = faChessKing;
  faTimes = faTimes;
  faReply = faReply;

  trashedCategories: Category[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;
  deleting = false;

  count = 0;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    if (this.currentLang === 'en') {
      this.displayedColumns = ['id', 'imagePath', 'title_EN', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy', 'actions'];
    } else if (this.currentLang === 'fr') {
      this.displayedColumns = ['id', 'imagePath', 'title_FR', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy', 'actions'];
    }

    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      if (this.currentLang === 'en') {
        this.displayedColumns = ['id', 'imagePath', 'title_EN', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy', 'actions'];
      } else if (this.currentLang === 'fr') {
        this.displayedColumns = ['id', 'imagePath', 'title_FR', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy', 'actions'];
      }
    });

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
      if (result) {
        this.store.dispatch(new CategoriesActions.DeleteStart(id));
      }
    });
  }


  onRestore(id: number) {
    let alertHeader = '';
    let alertMsg = '';
    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.RESTORE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.RESTORE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CategoriesActions.RestoreStart(id));
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

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);



}
