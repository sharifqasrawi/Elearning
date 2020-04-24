import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CoursesActions.FetchDeletedStart());

    this.store.select('courses').subscribe(state => {
      this.courses = state.trashedCourses;
      this.errors = state.errors;
      this.loading = state.loading;
      this.loaded = state.loaded;


      this.count = state.trashedCourses.length;
      this.setTable();
    });

  }



  onRefresh() {
    this.store.dispatch(new CoursesActions.FetchDeletedStart());
    this.setTable();
    this.snackBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }


  onRestore(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '300px',
        data: { header: 'Confirmation', message: 'Restore this course from trash ?' }
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
