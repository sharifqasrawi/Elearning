import { TranslateService } from '@ngx-translate/core';
import { map, max } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faEdit, faTrashAlt, faFileAlt, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Session } from './../../../../models/session.model';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { NewSessionComponent } from './new-session/new-session.component';
import * as fromApp from '../../../../store/app.reducer';
import * as SessionsActions from './store/sessions.actions';


@Component({
  selector: 'app-course-sessions',
  templateUrl: './course-sessions.component.html',
  styleUrls: ['./course-sessions.component.css']
})
export class CourseSessionsComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faFileAlt = faFileAlt;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;

  sessions: Session[];
  courseId: number;
  sectionId: number;
  sectionName: string;

  loading = false;
  updated = false;
  updating = false;
  creating = false;
  deleting = false;
  errors: string[] = null;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Session>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    if (this.currentLang === 'en') {
      this.displayedColumns = ['id', 'order', 'title_EN', 'duration', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
    } else if (this.currentLang === 'fr') {
      this.displayedColumns = ['id', 'order', 'title_FR', 'duration', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
    }

    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      if (this.currentLang === 'en') {
        this.displayedColumns = ['id', 'order', 'title_EN', 'duration', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
      } else if (this.currentLang === 'fr') {
        this.displayedColumns = ['id', 'order', 'title_FR', 'duration', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
      }
    });


    this.route.params.subscribe((params: Params) => {
      this.sectionId = +params.sectionId;
      this.courseId = +params.courseId;
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.sectionName = params.section;
    });


    this.store.dispatch(new SessionsActions.FetchStart(this.sectionId));
    this.store.select('sessions').subscribe(state => {
      this.sessions = state.sessions;
      this.loading = state.loading;
      this.deleting = state.deleting;
      this.updating = state.updating;
      this.errors = state.errors;

      if (state.created) {
        this.toastr.success('Session created successfully', 'Create');
        this.store.dispatch(new SessionsActions.ClearStatus());
      }

      if (state.updated) {
        this.toastr.info('Session updated successfully', 'Update');
        this.store.dispatch(new SessionsActions.ClearStatus());
      }

      if (state.deleted) {
        this.toastr.warning('Session deleted successfully', 'Delete');
        this.store.dispatch(new SessionsActions.ClearStatus());
      }

      this.setTable();
    });


  }

  onCreate() {
    let maxOrder = -1;
    if (this.sessions.length > 0)
      maxOrder = Math.max.apply(Math, [...this.sessions].map(s => s.order));

    const dialogRef = this.dialog.open(NewSessionComponent,
      {
        width: '650px',
        disableClose: true,
        data: {
          editMode: false,
          sectionId: this.sectionId,
          courseId: this.courseId,
          order: maxOrder + 1
        }
      });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  onEdit(sessionId: number, title_EN: string, title_FR: string, order: number, duration: number) {
    const dialogRef = this.dialog.open(NewSessionComponent,
      {
        width: '650px',
        disableClose: true,
        data: {
          editMode: true,
          sessionId: sessionId,
          sectionId: this.sectionId,
          courseId: this.courseId,
          order: order,
          title_EN: title_EN,
          title_FR: title_FR,
          duration: duration
        }
      });

    dialogRef.afterClosed().subscribe(() => {

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
        this.store.dispatch(new SessionsActions.DeleteStart(id));
    });
  }


  onRefresh() {
    this.store.dispatch(new SessionsActions.FetchStart(this.sectionId));
    this.setTable();
  }

  onGoBack() {
    this.location.back();
  }


  private setTable() {

    this.dataSource = new MatTableDataSource(this.sessions);
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
