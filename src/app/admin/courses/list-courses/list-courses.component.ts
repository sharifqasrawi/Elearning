import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch, faCheck, faTimes, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Course } from './../../../models/course.model';
import * as fromApp from '../../../store/app.reducer';
import * as CoursesActions from '../store/courses.actions';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {

  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  courses: Course[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;
  deleting = false;

  count = 0;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    if (this.currentLang === 'en') {
      this.displayedColumns = ['id', 'title_EN', 'category', 'level', 'duration', 'isPublished', 'createdBy', 'createdAt', 'actions'];
    } else if (this.currentLang === 'fr') {
      this.displayedColumns = ['id', 'title_FR', 'category', 'level', 'duration', 'isPublished', 'createdBy', 'createdAt', 'actions'];
    }

    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      if (this.currentLang === 'en') {
        this.displayedColumns = ['id', 'title_EN', 'category', 'level', 'duration', 'isPublished', 'createdBy', 'createdAt', 'actions'];
      } else if (this.currentLang === 'fr') {
        this.displayedColumns = ['id', 'title_FR', 'category', 'level', 'duration', 'isPublished', 'createdBy', 'createdAt', 'actions'];
      }
    });


    this.store.select('courses').subscribe(state => {
      this.courses = state.courses;
      this.errors = state.errors;
      this.loading = state.loading;
      this.loaded = state.loaded;


      this.count = state.courses.length;
      this.setTable();
    });

    if (!this.courses)
      this.store.dispatch(new CoursesActions.FetchStart());
  }



  onRefresh() {
    this.store.dispatch(new CoursesActions.FetchStart());
    this.setTable();
  }


  onTrash(id: number) {
    let alertHeader = '';
    let alertMsg = '';
    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.TRASH_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.TRASH_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        data: { header: alertHeader, message: alertMsg }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new CoursesActions.TrashRestoreStart({ id: id, action: 'trash' }));
    });
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.courses);
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
