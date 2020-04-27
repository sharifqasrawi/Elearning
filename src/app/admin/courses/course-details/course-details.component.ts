import { map } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as fromApp from '../../../store/app.reducer';
import * as CoursesActions from '../store/courses.actions';
import { Course } from './../../../models/course.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseId: number = null;
  course: Course = null;
  publishing = false;
  trashed = false;

  colorPrimary: ThemePalette = 'primary';
  colorAccent: ThemePalette = 'accent';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.id;
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.trashed = params.trashed;
    });

    this.store.select('courses')
      .subscribe(state => {

        if (!this.trashed) {
          this.course = state.courses.find(c => c.id === this.courseId);
        }
        else {
          this.course = state.trashedCourses.find(c => c.id === this.courseId);
        }
        this.publishing = state.publishing;

        if (state.published){
          this.toastr.success('Changes saved successfully', 'Saved');
        }

      

        
      });
  }


  onPublish(isPublished: boolean) {
    if (isPublished)
      this.store.dispatch(new CoursesActions.PublishUnpublishStart({ id: this.courseId, action: 'unpublish' }));
    else
      this.store.dispatch(new CoursesActions.PublishUnpublishStart({ id: this.courseId, action: 'publish' }));

  }
}
