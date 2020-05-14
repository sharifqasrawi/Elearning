import { CoursePickupDialogComponent } from './course-pickup-dialog/course-pickup-dialog.component';
import { ErrorDialogComponent } from './../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faTag, faThumbsUp, faThumbsDown, faInfoCircle, faComment, faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

import * as fromApp from '../../store/app.reducer';
import * as HomeCoursesActions from '../store/courses.actions';
import * as HomeSessionActions from './course-session/store/session.actions';
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
  faInfoCircle = faInfoCircle;
  faComment = faComment;
  faCheck = faCheck;
  faCheckDouble = faCheckDouble;

  categoryId: number = null;
  categorySlug: string = null;

  course: Course = null;
  courseId: number = null;
  courseSlug: string = null;
  courseTitle: string = null;
  classId: string = null;
  currentSessionId: number = null;
  currentSessionSlug: string = null;

  loading = false;

  userId: string = null;
  isAuthenticated = false;

  like: Like = null;
  loadingLike = false;
  isUserLiked = false;

  loadingEnroll = false;
  isUserEnrolled = false;

  allExpandState = true;

  breadcrumbLinks: { url?: string, label: string }[];
  currentUrl: string = null;

  isExpanded = true;
  isShowing = false;
  mobileQuery: MediaQueryList;
  navOpened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 993px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    this.currentUrl = this.router.url;

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
      this.loadingEnroll = state.loadingEnroll;



      if (this.course) {
        this.like = this.course.likes.find(l => l.courseId === this.courseId && l.userId === this.userId);
        this.isUserLiked = this.like ? true : false;

        if (this.course.cls.id) {
          this.classId = this.course.cls.id;
          if (this.isAuthenticated) {
            const member = this.course.cls.members.find(m => m.id === this.userId);
            this.isUserEnrolled = member ? true : false;

            if (this.isUserEnrolled) {
              if (member.currentSessionId) {
                this.currentSessionId = member.currentSessionId;
                this.currentSessionSlug = member.currentSessionSlug;
              }
            }
          }
        } else {
          this.classId = null;
        }
      }
      else {
        // this.router.navigate(['/home']);
      }

      if (state.errors) {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          data: { errors: [...state.errors] }
        });
      }
    });

    if (this.currentSessionId) {
      this.dialog.open(CoursePickupDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {
          currentSessionTitle: this.currentSessionSlug.split('-').join(' '),
          sessionUrl: `categories/${this.categoryId}/${this.categorySlug}/course/${this.courseId}/${this.courseSlug}/session/${this.currentSessionId}/${this.currentSessionSlug}`
        }
      });
    }


  }


  onLike() {
    if (!this.loadingLike) {
      this.store.dispatch(new HomeCoursesActions.LikeStart({
        courseId: this.courseId,
        action: this.isUserLiked ? 'unlike' : 'like'
      }));
    }
  }

  onEnroll() {
    if (!this.loadingEnroll) {
      this.store.dispatch(new HomeCoursesActions.EnrollStart({
        classId: this.classId,
        action: this.isUserEnrolled ? 'disenroll' : 'enroll'
      }));
    }
  }

  onSelectSession(sessionId: number) {
    if (this.isUserEnrolled) {
      this.store.dispatch(new HomeSessionActions.SetCurrentSessionStart({
        classId: this.classId,
        sessionId: sessionId
      }));
    }
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
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
