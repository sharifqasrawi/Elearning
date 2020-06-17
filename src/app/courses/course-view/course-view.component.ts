import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { DoneSession } from './../../models/doneSession.model';
import { Favorite } from './../../models/favorite.model';
import { CoursePickupDialogComponent } from './course-pickup-dialog/course-pickup-dialog.component';
import { ErrorDialogComponent } from './../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faTag, faThumbsUp, faThumbsDown, faInfoCircle, faComment, faCheck, faCheckDouble, faHeart } from '@fortawesome/free-solid-svg-icons';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

import * as fromApp from '../../store/app.reducer';
import * as HomeCoursesActions from '../store/courses.actions';
import * as HomeSessionActions from './course-session/store/session.actions';
import * as MemberActions from '../../member/store/member.actions';

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
  faHeart = faHeart;

  errors: string[] = null;

  categoryId: number = null;
  categorySlug: string = null;

  course: Course = null;
  courseId: number = null;
  courseSlug: string = null;
  courseTitle: string = null;
  classId: string = null;
  currentSessionId: number = null;
  currentSessionSlug: string = null;
  checkCurrnetSession = true;

  loading = false;

  userId: string = null;
  isAuthenticated = false;

  like: Like = null;
  loadingLike = false;
  isUserLiked = false;

  loadingEnroll = false;
  isUserEnrolled = false;

  favorites: Favorite[] = null;
  favorite: Favorite = null;
  loadedFavorites = false;
  addingToFavorite = false;
  isAddedToFavorites = false;

  doneSessions: DoneSession[] = null;
  donePercentage: string = null;
  donePercentageN: number = 0;

  allExpandState = true;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];
  currentUrl: string = null;

  isExpanded = true;
  isShowing = false;
  mobileQuery: MediaQueryList;
  navOpened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;

  currentLang: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private translate: TranslateService,
    private titleService: Title
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 993px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['COURSES.COURSES']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['COURSES.COURSES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.translate.get(['COURSES.COURSES']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['COURSES.COURSES']}`);
      });
    });

    this.currentUrl = this.router.url;

    this.route.params.subscribe((params: Params) => {
      this.categoryId = +params.categoryId;
      this.categorySlug = params.categorySlug;
      this.courseId = +params.courseId;
      this.courseSlug = params.courseSlug;

      this.courseTitle = this.courseSlug.split('-').join(' ');

      if (this.categorySlug) {
        this.breadcrumbLinks = [
          { url: '/', label: 'Home', translate: true },
          {
            url: `/categories/${this.categoryId}/${this.categorySlug}`,
            label: `${this.categorySlug.split('-').join(' ')} `
          },
          {
            url: `/categories/${this.categoryId}/${this.categorySlug}/course/${this.courseId}/${this.courseSlug}`,
            label: this.courseTitle
          }
        ];
      }
      else {
        this.breadcrumbLinks = [
          { url: '/', label: 'Home', translate: true },
          {
            url: '/courses',
            label: 'Courses',
            translate: true
          },
          {
            url: `/courses/course/${this.courseId}/${this.courseSlug}`,
            label: this.courseTitle
          }
        ];
      }

    });

    this.route.queryParams.subscribe((params: Params) => {
      this.checkCurrnetSession = params.check === 'no' ? false : true;
    });



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
      this.errors = state.errors;


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
    });

    if (!this.course && this.categoryId) {
      this.store.dispatch(new HomeCoursesActions.FetchStart({ categoryId: this.categoryId, courseId: this.courseId }));
    } else if (!this.course && !this.categoryId) {
      this.store.dispatch(new HomeCoursesActions.FetchStart({ courseId: this.courseId }));
    }


    if (this.isAuthenticated) {

      if (this.currentSessionId && this.checkCurrnetSession) {
        this.dialog.open(CoursePickupDialogComponent, {
          width: '400px',
          disableClose: true,
          data: {
            currentSessionTitle: this.currentSessionSlug ? this.currentSessionSlug.split('-').join(' ') : null,
            sessionUrl: `categories/${this.categoryId}/${this.categorySlug}/course/${this.courseId}/${this.courseSlug}/session/${this.currentSessionId}/${this.currentSessionSlug}`
          }
        });
      }

      this.store.dispatch(new MemberActions.FetchFavoritesStart());

      // if (this.isUserEnrolled)
      this.store.dispatch(new MemberActions.FetchDoneSessionsStart(this.courseId));

      this.store.select('member').subscribe(state => {
        this.favorites = state.favorites;
        this.loadedFavorites = state.loadedFavorites;
        this.addingToFavorite = state.addingToFavorite;
        this.doneSessions = state.doneSessions;
        this.errors = state.errors;
        this.donePercentageN = state.donePercentage;

        // if (state.loadedDoneSessions) {
        if (this.donePercentageN) {
          this.donePercentage = `${this.donePercentageN.toFixed(0)} %`;
          if (this.donePercentageN === 100) {
            this.donePercentage += ' Congratulations !!';
          } else if (this.donePercentageN === 0) {
            this.donePercentage = `0 %`;
          }
        }
        else {
          this.donePercentage = `0 %`;
        }
        // }

        if (state.loadedFavorites) {
          const fav = state.favorites.find(f => f.courseId === this.courseId);
          this.isAddedToFavorites = fav ? true : false;
          this.favorite = fav;
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

  onAddToFavorites() {
    if (!this.addingToFavorite) {
      if (!this.isAddedToFavorites) {
        this.store.dispatch(new MemberActions.AddCourseToFavoritesStart(this.courseId));
      }
      else if (this.isAddedToFavorites && this.favorite) {
        this.store.dispatch(new MemberActions.RemoveCourseFromFavoritesStart(this.favorite.id));
      }
    }
  }

  onEnroll() {
    if (!this.loadingEnroll) {

      if (this.isUserEnrolled) {
        let headerText = '';
        let headerMsg = '';
        this.translate.get(['COURSE.DISENROLL_HEADER', 'COURSE.DISENROLL_MSG']).subscribe(trans => {
          headerText = trans['COURSE.DISENROLL_HEADER'];
          headerMsg = trans['COURSE.DISENROLL_MSG'];
        });
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px',
          data: {
            header: headerText,
            message: headerMsg
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.store.dispatch(new HomeCoursesActions.EnrollStart({
              classId: this.classId,
              action: 'disenroll'
            }));
          }
        });
      }
      else {
        this.store.dispatch(new HomeCoursesActions.EnrollStart({
          classId: this.classId,
          action: 'enroll'
        }));

        this.store.dispatch(new MemberActions.FetchDoneSessionsStart(this.courseId));
      }
    }
  }

  onSelectSession(sessionId: number) {
    if (this.isUserEnrolled) {
      this.store.dispatch(new HomeSessionActions.SetCurrentSessionStart({
        classId: this.classId,
        sessionId: sessionId
      }));

      const currentSession = this.doneSessions.find(s => s.sessionId === sessionId);
      if (!currentSession)
        this.store.dispatch(new MemberActions.MarkSessionStart(sessionId));
    }
  }

  onCheckIsDoneSession(sessionId: number) {
    for (let ds of this.doneSessions) {
      if (ds.sessionId === sessionId) return true;
    }
    return false;
  }

  onMarkDoneSession($event, sessionId: number) {
    const checkedState = $event.checked;

    if (this.isUserEnrolled) {
      if (checkedState) {
        this.store.dispatch(new MemberActions.MarkSessionStart(sessionId));
      } else {
        this.store.dispatch(new MemberActions.UnmarkSessionStart(sessionId));
      }
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
