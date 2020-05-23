import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

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
    if(this.loadedMemberCoursesProgress){
      const progress = this.memberCoursesProgress.find(c => c.courseId === courseId).donePercentage.toFixed(0) + ' %';
      return progress;
    }
    return ' %';
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}
