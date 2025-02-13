import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import * as MemberActions from '../store/member.actions';
import * as fromApp from '../../store/app.reducer';
import { Course } from './../../models/course.model';


@Component({
  selector: 'app-member-courses',
  templateUrl: './member-courses.component.html',
  styleUrls: ['./member-courses.component.css']
})
export class MemberCoursesComponent implements OnInit {


  faThumbsUp = faThumbsUp;
  faSearch = faSearch;

  courses: Course[] = null;
  loading = false;
  loaded = false;
  loadedFavorites = false;
  errors: string[] = null;
  isFavoritesList = false;

  memberCoursesProgress: { courseId: number, donePercentage: number }[] = null;
  loadingMemberCoursesProgress = false;
  loadedMemberCoursesProgress = false;

  currentLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['DASHBOARD.ENROLLED_COURSES', 'DASHBOARD.FAVORITE_COURSES']).subscribe(trans => {
      if (this.isFavoritesList)
        this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.FAVORITE_COURSES']}`);
      else
        this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.ENROLLED_COURSES']}`);

    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.translate.get(['DASHBOARD.ENROLLED_COURSES', 'DASHBOARD.FAVORITE_COURSES']).subscribe(trans => {
        if (this.isFavoritesList)
          this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.FAVORITE_COURSES']}`);
        else
          this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.ENROLLED_COURSES']}`);
      });
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.fetch === 'favorites') {
        this.isFavoritesList = true;
        this.store.dispatch(new MemberActions.FetchFavoriteCoursesStart());
      } else {
        this.isFavoritesList = false;
        this.store.dispatch(new MemberActions.FetchCoursesStart());
        this.store.dispatch(new MemberActions.FetchProgressCoursesStart());
      }

      this.store.select('member').subscribe(state => {
        this.courses = state.courses;
        this.loading = state.loading;
        this.loaded = state.loaded;
        this.loadedFavorites = state.loadedFavorites;
        this.memberCoursesProgress = state.memberCoursesProgress;
        this.loadingMemberCoursesProgress = state.loadingMemberCoursesProgress;
        this.loadedMemberCoursesProgress = state.loadedMemberCoursesProgress;

        this.errors = state.errors;

      });
    });

  }

  getCourseProgress(courseId: number): string {
    if (this.loadedMemberCoursesProgress) {
      const progress = this.memberCoursesProgress.find(c => c.courseId === courseId).donePercentage.toFixed(0) + ' %';
      return progress;
    }
    return ' %';
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}
