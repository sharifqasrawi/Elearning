import { Component, OnInit, ViewChild } from '@angular/core';
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
export class CourseClassComponent implements OnInit {

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

  displayedColumns: string[] = ['id', 'fullName', 'gender', 'country', 'email', 'enrollDateTime', 'currentSessionId', 'actions'];
  dataSource: MatTableDataSource<Member>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
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
}
