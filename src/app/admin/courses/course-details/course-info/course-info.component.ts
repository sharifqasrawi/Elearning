import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Course } from './../../../../models/course.model';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseId: number = null;
  course: Course = null;
  @Input() trashed: boolean;

  colorPrimary: ThemePalette = 'primary';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.id;
    });

    this.store.select('courses')
      .subscribe(state => {
        
        if (!this.trashed) {
          this.course = state.courses.find(c => c.id === this.courseId);
        }
        else {
          this.course = state.trashedCourses.find(c => c.id === this.courseId);
        }
      });
  }

}
