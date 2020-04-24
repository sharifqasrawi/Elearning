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
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {

  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;

  courses: Course[] = null;
  errors: string[] = null;
  loading = false;
  loaded = false;
  deleting = false;

  count = 0;

  displayedColumns: string[] = ['id', 'title_EN', 'category', 'level', 'duration', 'isPublished', 'createdBy', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CoursesActions.FetchStart());

    this.store.select('courses').subscribe(state => {
      this.courses = state.courses;
      this.errors = state.errors;
      this.loading = state.loading;
      this.loaded = state.loaded;


      this.count = state.courses.length;
      this.setTable();
    });

  }



  onRefresh() {
    this.store.dispatch(new CoursesActions.FetchStart());
    this.setTable();
    this.snackBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }


  onTrash(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '300px',
        data: { header: 'Confirmation', message: 'Move this course to trash ?' }
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
