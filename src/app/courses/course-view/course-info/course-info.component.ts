import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faTag, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

import { Like } from './../../../models/like.model';
import { Course } from './../../../models/course.model';
import * as fromApp from '../../../store/app.reducer';
import * as HomeCoursesActions from '../../store/courses.actions';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  faTag = faTag;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  categoryId: number = null;
  categorySlug: string = null;

  course: Course = null;
  courseId: number = null;
  courseSlug: string = null;
  courseTitle: string = null;

  userId: string = null;
  like: Like = null;
  isUserLiked = false;

  loadingCourse = false;
  loadingLike = false;

  isAuthenticated = false;
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
    });

    this.store.select('login')
      .subscribe(state => {
        this.isAuthenticated = state.isAuthenticated;
        this.userId = state.user.id
      });

    this.store.select('homeCourses').subscribe(state => {
      this.course = state.courses.find(c => c.id === this.courseId);
      this.loadingCourse = state.loading;
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

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}