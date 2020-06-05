import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { faSearch, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';


import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { Section } from './../../../../models/section.model';
import { NewSectionComponent } from './new-section/new-section.component';

import * as fromApp from '../../../../store/app.reducer';
import * as SectionsActions from './store/sections.actions';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit {

  faSearch = faSearch;
  faCheck = faCheck;
  faTimes = faTimes;

  courseId: number;
  sections: Section[] = null;

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
    private translate: TranslateService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.courseId;
    });

    this.store.dispatch(new SectionsActions.FetchStart(this.courseId));

    this.store.select('sections').subscribe(state => {
      this.sections = state.sections;
      this.loading = state.loading;
      this.updating = state.updating;
      this.creating = state.creating;
      this.deleting = state.deleting;
      this.errors = state.errors;


      if (state.created) {
        this.toastr.success('Saved', 'Section created successfully');
        this.store.dispatch(new SectionsActions.ClearStatus());
      }

      if (state.updated) {
        this.toastr.info('Saved', 'Section updated successfully');
        this.store.dispatch(new SectionsActions.ClearStatus());
      }

      if (state.deleted) {
        this.toastr.warning('Deleted', 'Section deleted successfully');
        this.store.dispatch(new SectionsActions.ClearStatus());
      }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        data: { header: alertHeader, message: alertMsg }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new SectionsActions.DeleteStart(id));
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
    this.store.dispatch(new SectionsActions.FetchStart(this.courseId));
    this.setTable();
   
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
