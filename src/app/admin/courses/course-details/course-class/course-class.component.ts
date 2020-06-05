import { AddMemberComponent } from './add-member/add-member.component';
import { ConfirmDialogComponent } from './../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as CoursesActions from '../../store/courses.actions';
import { Class, Member } from './../../../../models/class.model';
import { Course } from './../../../../models/course.model';

@Component({
  selector: 'app-course-class',
  templateUrl: './course-class.component.html',
  styleUrls: ['./course-class.component.css']
})
export class CourseClassComponent implements OnInit, OnDestroy {

  faSearch = faSearch;
  faInfoCircle = faInfoCircle;


  courseId: number = null;
  course: Course = null;
  cls: Class = null;
  errors: string[] = null;
  loading = false;
  updating = false;
  classCreated = false;

  form: FormGroup;

  count = 0;

  displayedColumns: string[] = ['id', 'fullName', 'gender', 'country', 'email', 'enrollDateTime', 'actions'];
  dataSource: MatTableDataSource<Member>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;




  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.courseId;
    });

    this.store.select('courses').subscribe(state => {
      this.course = state.courses.find(c => c.id === this.courseId);
      this.errors = state.errors;
      this.loading = state.loading;
      this.updating = state.updating;

      if (this.course.cls.id) {
        this.classCreated = true;
        this.cls = this.course.cls;
        this.count = this.cls.members.length;
        this.setTable();
      } else {
        this.classCreated = false;

        this.form = new FormGroup({
          name_EN: new FormControl(null, [Validators.required])
        });
      }

    });

  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new CoursesActions.CreateClassStart({
      courseId: this.courseId,
      name_EN: this.form.value.name_EN
    }));
  }

  onEnroll(userId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { header: 'Confirm class disenroll', message: 'Disenroll this user from the class ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new CoursesActions.EnrollUserStart({
          userId: userId,
          classId: this.cls.id,
          action: 'disenroll'
        }));
    });
  }

  onAddMember() {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px',
      disableClose: true,
      data: { classId: this.cls.id }
    });
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.cls.members);
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


  ngOnDestroy(): void {
  }
}
