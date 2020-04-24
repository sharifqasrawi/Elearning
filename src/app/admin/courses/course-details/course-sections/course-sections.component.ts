import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faSearch, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Section } from './../../../../models/section.model';
import { NewSectionComponent } from './new-section/new-section.component';

import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit {

  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;

  @Input() courseId: number;
  @Input() sections: Section[] = null;

  errors: string[] = null;
  loading = false;
  loaded = false;
  deleting = false;

  count = 0;

  displayedColumns: string[] = ['id', 'order', 'name_EN', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
  dataSource: MatTableDataSource<Section>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.store.select('courses').subscribe(state => {
      this.sections = [...state.courses.find(c => c.id === this.courseId).sections];
      this.setTable();
    });

  }

  onEdit() {
    const dialogRef = this.dialog.open(NewSectionComponent,
      {
        width: '650px',
        disableClose: true,
        data: { courseId: this.courseId, editMode: false }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.setTable();
      });
  }

  onRefresh() {
    // this.store.dispatch(new CoursesActions.FetchStart());
    this.setTable();
    this.snackBar.open('Refreshing...', 'OK', {
      duration: 2000
    });
  }


  private setTable() {

    this.dataSource = new MatTableDataSource(this.sections);
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
