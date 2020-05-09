import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faTag, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as HomeCoursesActions from '../store/courses.actions';
import { Course } from './../../models/course.model';
import { Like } from './../../models/like.model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  faTag = faTag;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  categoryId: number = null;
  categorySlug: string = null;

  course: Course = null;
  courseId: number = null;
  courseSlug: string = null;
  courseTitle: string = null;

  loading = false;

  userId: string = null;
  isAuthenticated = false;

  like: Like = null;
  loadingLike = false;
  isUserLiked = false;

  allExpandState = true;

  breadcrumbLinks: { url?: string, label: string }[];
  currentUrl: string = null;

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

    this.store.select('login')
      .subscribe(state => {
        this.isAuthenticated = state.isAuthenticated;
        if (state.user)
          this.userId = state.user.id
      });


    this.store.select('homeCourses').subscribe(state => {
      this.course = state.courses.find(c => c.id === this.courseId);
      this.loading = state.loading;
      this.loadingLike = state.loadingLike;

      if (this.course) {
        this.like = this.course.likes.find(l => l.courseId === this.courseId && l.userId === this.userId);
        this.isUserLiked = this.like ? true : false;
      }
    });

    this.currentUrl = this.router.url;
  }


  onLike() {
    this.store.dispatch(new HomeCoursesActions.LikeStart({
      courseId: this.courseId,
      action: this.isUserLiked ? 'unlike' : 'like'
    }));
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
