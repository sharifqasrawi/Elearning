import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as HomeCoursesActions from '../store/courses.actions';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  faTag = faTag;

  categoryId: number = null;
  categorySlug: string = null;

  course: Course = null;
  courseId: number = null;
  courseSlug: string = null;
  courseTitle: string = null;

  loading = false;
  allExpandState = true;

  breadcrumbLinks: { url?: string, label: string }[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = +params.categoryId;
      this.categorySlug = params.categorySlug;
      this.courseId = +params.courseId;
      this.courseSlug = params.courseSlug;

      this.courseTitle = this.courseSlug.split('-').join(' ');

      this.breadcrumbLinks = [
        { url: '/home', label: 'Home' },
        {
          url: `/categories/${this.categoryId}/${this.categorySlug}`,
          label: `${this.categorySlug.split('-').join(' ')} `
        },
        {
          url: `/categories/${this.categoryId}/${this.categorySlug}/course/${this.courseId}/${this.courseSlug}`,
          label: this.courseTitle
        }
      ];
    });

    this.store.dispatch(new HomeCoursesActions.FetchStart({ categoryId: this.categoryId, courseId: this.courseId }));

    this.store.select('homeCourses').subscribe(state => {
      this.course = state.courses.find(c => c.id === this.courseId);
      
      this.loading = state.loading;
    });
  }


  // onNextPage() {

  //   const sessionsUrls: { id: number, slug: string }[] = [];

  //   for (let section of this.course.sections) {
  //     for (let session of section.sessions) {
  //       sessionsUrls.push({
  //         id: session.id,
  //         slug: session.slug_EN
  //       });
  //     }
  //   }

  //   // this.router.navigate(['session/', 10006, 'session-1'], { relativeTo: this.route });

  // }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
}
