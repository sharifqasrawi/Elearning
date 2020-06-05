import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch, faCheck, faTimes, faEye, faReply } from '@fortawesome/free-solid-svg-icons';

import { Course } from './../../../models/course.model';
import * as fromApp from '../../../store/app.reducer';
import * as CoursesActions from '../store/courses.actions';

@Component({
  selector: 'app-trashed-courses',
  templateUrl: './trashed-courses.component.html',
  styleUrls: ['./trashed-courses.component.css'],
})
export class TrashedCoursesComponent implements OnInit {

  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;
  faEye = faEye;
  faReply = faReply;

  courses: Course[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;
  deleting = false;

  count = 0;

  displayedColumns: string[] = ['id', 'title_EN', 'category', 'level', 'duration', 'createdBy', 'deletedAt', 'actions'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {


    this.store.select('courses').subscribe(state => {
      this.courses = state.trashedCourses;
      this.errors = state.errors;
      this.loading = state.loading;
      this.loaded = state.loaded;


      this.count = state.trashedCourses.length;
      this.setTable();
    });

    if (!this.courses)
      this.store.dispatch(new CoursesActions.FetchDeletedStart());
  }



  onRefresh() {
    this.store.dispatch(new CoursesActions.FetchDeletedStart());
    this.setTable();

  }


  onRestore(id: number) {
    let alertHeader = '';
    let alertMsg = '';
    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.RESTORE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.RESTORE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        data: { header: alertHeader, message: alertMsg }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new CoursesActions.TrashRestoreStart({ id: id, action: 'restore' }));
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
