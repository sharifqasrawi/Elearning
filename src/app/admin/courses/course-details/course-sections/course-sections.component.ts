import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faSearch, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Section } from './../../../../models/section.model';
import { NewSectionComponent } from './new-section/new-section.component';

import * as fromApp from '../../../../store/app.reducer';
import * as CoursesActions from '../../store/courses.actions';
import { ToastrService } from 'ngx-toastr';

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
  updating = false;
  creating = false;
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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.store.select('courses').subscribe(state => {
      this.sections = [...state.courses.find(c => c.id === this.courseId).sections];
      this.updating = state.updating;
      this.creating = state.creating;
      this.deleting = state.deleting;
      this.loading = state.loading;
      this.errors = state.errors;


      // if (state.created) {
      //   this.toastr.success('Saved', 'Section created successfully');
      //   this.store.dispatch(new CoursesActions.ClearStatus());
      // }

      // if (state.updated) {
      //   this.toastr.info('Saved', 'Section updated successfully');
      //   this.store.dispatch(new CoursesActions.ClearStatus());
      // }

      // if (state.deleted) {
      //   this.toastr.warning('Deleted', 'Section deleted successfully');
      //   this.store.dispatch(new CoursesActions.ClearStatus());
      // }

      this.setTable();
    });

  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '250px',
        data: { header: 'Confirmation', message: 'Delete this section?' }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new CoursesActions.DeleteSectionStart({
          course: {
            id: this.courseId
          },
          id: id,
          action: 'remove'
        }))
    });
  }

  onCreate() {

    let maxOrder = -1;
    if (this.sections.length > 0)
      maxOrder = Math.max.apply(Math, this.sections.map(s => s.order));

    const dialogRef = this.dialog.open(NewSectionComponent,
      {
        width: '650px',
        disableClose: true,
        data: { courseId: this.courseId, editMode: false, order: maxOrder + 1 }
      });

    dialogRef.afterClosed().subscribe(() => {
      this.setTable();
    });
  }

  onEdit(sectionId: number, name_EN: string, order: number) {
    const dialogRef = this.dialog.open(NewSectionComponent,
      {
        width: '650px',
        disableClose: true,
        data: {
          courseId: this.courseId,
          sectionId: sectionId,
          name_EN: name_EN,
          order: order,
          editMode: true

        }
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
