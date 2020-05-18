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
  errors: string[] = null;
  isFavoritesList = false;

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
      }

      this.store.select('member').subscribe(state => {
        this.courses = state.courses;
        this.loading = state.loading;
        this.errors = state.errors;
      });
    });


  }


  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}
