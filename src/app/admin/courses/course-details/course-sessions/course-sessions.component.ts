import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { faEdit, faTrashAlt, faFileAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Section } from './../../../../models/section.model';
import { Session } from './../../../../models/session.model';
import * as fromApp from '../../../../store/app.reducer';
import * as CoursesActions from './../../store/courses.actions';
import { NewSessionComponent } from './new-session/new-session.component';
import { ToastrService } from 'ngx-toastr';


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

  sections: Section[];
  @Input() courseId: number;

  updated = false;
  updating = false;
  creating = false;
  deleting = false;
  errors: string[] = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.store.select('courses').subscribe(state => {
      this.sections = [...state.courses.find(c => c.id === this.courseId).sections];
      this.updating = state.updating;
      this.updated = state.updated;
      this.creating = state.creating;
      this.deleting = state.deleting;
      this.errors = state.errors;

      // if (state.created) {
      //   this.toastr.success('Saved', 'Session created successfully');
      //   this.store.dispatch(new CoursesActions.ClearStatus());
      // }

      // if(state.updated){
      //   this.toastr.info('Saved', 'Session updated successfully');
      //   this.store.dispatch(new CoursesActions.ClearStatus());
      // }

      // if(state.deleted){
      //   this.toastr.warning('Deleted', 'Session deleted successfully');
      //   this.store.dispatch(new CoursesActions.ClearStatus());
      // }
    });
  }

  onCreate(sectionId: number, sessions: Session[]) {

    let maxOrder = -1;
    if (sessions.length > 0)
      maxOrder = Math.max.apply(Math, [...sessions].map(s => s.order));

    const dialogRef = this.dialog.open(NewSessionComponent,
      {
        width: '650px',
        disableClose: true,
        data: {
          editMode: false,
          sectionId: sectionId,
          courseId: this.courseId,
          order: maxOrder + 1
        }
      });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  onEdit(sectionId: number, sessionId: number, title_EN: string, order: number, duration: number) {

    const dialogRef = this.dialog.open(NewSessionComponent,
      {
        width: '650px',
        disableClose: true,
        data: {
          editMode: true,
          sessionId: sessionId,
          sectionId: sectionId,
          courseId: this.courseId,
          order: order,
          title_EN: title_EN,
          duration: duration
        }
      });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '250px',
        data: { header: 'Confirmation', message: 'Delete this session ?' }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new CoursesActions.DeleteSessionStart(id));
    });
  }

}
