import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogComponent } from './../../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faTag, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

import { Like } from './../../../models/like.model';
import { Course } from './../../../models/course.model';
import * as fromApp from '../../../store/app.reducer';
import * as HomeCoursesActions from '../../store/courses.actions';
import { SignalRCoursesService } from './services/signalr-courses-service.service';

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
  courseTotalRating: string = null;
  courseTotalRatingN: number = null;
  courseRatingsCount = 0;
  courseRateUserValue = 0;

  userId: string = null;
  like: Like = null;
  isUserLiked = false;

  loadingCourse = false;
  loadingLike = false;
  loadingRate = false;

  isAuthenticated = false;
  currentUrl: string = null;

  currentLang: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private translate:TranslateService
    // private signalRCoursesService: SignalRCoursesService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.currentLang = this.translate.currentLang);

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
        if (state.user)
          this.userId = state.user.id;
      });

    this.store.select('homeCourses').subscribe(state => {
      this.course = state.courses.find(c => c.id === this.courseId);
      this.loadingCourse = state.loading;
      this.loadingLike = state.loadingLike;
      this.loadingRate = state.loadingRate;

      if (state.errors) {
        this.dialog.open(ErrorDialogComponent, {
          width: '450px',
          data: { errors: state.errors }
        });
      }

      if (this.course) {
        this.like = this.course.likes.find(l => l.courseId === this.courseId && l.userId === this.userId);
        this.isUserLiked = this.like ? true : false;

        this.courseTotalRating = this.course.ratings.totalRating.toFixed(1);
        this.courseTotalRatingN = this.course.ratings.totalRating;
        this.courseRatingsCount = this.course.ratings.ratings.length;

        if (this.isAuthenticated && this.course.ratings.ratings.length > 0) {
          const userRating = this.course.ratings.ratings
            .find(r => r.userId === this.userId && r.courseId === this.courseId);

          this.courseRateUserValue = userRating ? userRating.value : 0;
        }
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

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    const newValue = $event.newValue;

    if (this.isAuthenticated) {
      this.store.dispatch(new HomeCoursesActions.RateStart({
        courseId: this.courseId,
        value: newValue
      }));
    }
    else {

    }
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}