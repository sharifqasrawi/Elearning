import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import * as HomeCoursesActions from './store/courses.actions';
import * as fromApp from '../store/app.reducer';
import { Course } from './../models/course.model';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  faSearch = faSearch;
  faThumbsUp = faThumbsUp;

  courses: Course[] = null;
  storeCourses: Course[] = null;
  errors: string[] = null;
  categoryId: number = null;
  categoryTitle: string = null;
  loading = false;
  loaded = false;

  categoryEmpty = false;

  isAuthenticated = false;
  userId: string = null;

  searchForm: FormGroup;
  levels: string[] = ['All', 'Basic', 'Medium', 'Advanced'];
  level: string;

  languages: string[] = ['All', 'Arabic', 'English', 'French'];
  language: string;

  orderByOptions: string[] = ['Default', 'A-Z', 'Stars +', 'Stars -'];
  orderBy: string;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe((params: Params) => {
      this.categoryId = +params.categoryId;

      if (this.categoryId) {
        this.store.dispatch(new HomeCoursesActions.FetchStart({ categoryId: this.categoryId }));
      } else {
        this.store.dispatch(new HomeCoursesActions.FetchStart());
      }


      if (params.categorySlug) {
        this.categoryTitle = (params.categorySlug as string).split('-').join(' ');

        this.breadcrumbLinks = [
          { url: '/', label: 'Home', translate: true },
          { label: `${this.categoryTitle}` },
        ];
      } else {
        this.breadcrumbLinks = [
          { url: '/', label: 'Home', translate: true },
          { label: 'Courses', translate: true },
        ];
      }

    });



    this.store.select('login').subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.userId = state.user ? state.user.id : null;
    });


    this.store.select('homeCourses').subscribe(state => {
      this.storeCourses = state.courses;
      this.courses = this.storeCourses;
      this.loading = state.loading;
      this.loaded = state.loaded;
      this.errors = state.errors;

      if (state.errors) {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          data: { errors: [...state.errors] }
        });
      }

      if (this.courses.length > 0)
        this.categoryEmpty = false;
      else
        this.categoryEmpty = true;
    });


    this.searchForm = new FormGroup({
      title_EN: new FormControl(null)
    });


  }

  onRefresh() {
    this.store.dispatch(new HomeCoursesActions.FetchStart({ categoryId: this.categoryId }));
    this.searchForm.reset();
    this.language = null;
    this.level = null;
    this.orderBy = null;
  }


  onSearch() {
    const searchKey: string = this.searchForm.value.title_EN;

    if (searchKey == '' || searchKey === null) {
      this.courses = this.storeCourses;
    } else {
      this.courses = this.storeCourses.filter(c => c.title_EN.toLowerCase().includes(searchKey.toLowerCase()));
    }
  }

  onClearSearch() {
    this.searchForm.reset();
    this.onSearch();
  }

  onFilterByLevel() {
    if (this.level == '' || this.level === null || this.level === 'All') {
      this.courses = this.storeCourses;
    } else {
      this.courses = this.storeCourses.filter(c => c.level.toLowerCase().includes(this.level.toLowerCase()));
    }
  }

  onFilterByLanguage() {
    if (this.language == '' || this.language === null || this.language === 'All') {
      this.courses = this.storeCourses;
    } else {
      this.courses = this.storeCourses.filter(c => c.languages.toLowerCase().includes(this.language.toLowerCase()));
    }
  }

  onOrderBy() {
    if (this.orderBy === 'Stars +') {
      this.courses = this.courses.slice().sort((a, b) => (a.ratings.totalRating < b.ratings.totalRating) ? 1 : ((b.ratings.totalRating < a.ratings.totalRating) ? -1 : 0));
    } else if (this.orderBy === 'Stars +') {
      this.courses = this.courses.slice().sort((a, b) => (a.ratings.totalRating > b.ratings.totalRating) ? 1 : ((b.ratings.totalRating > a.ratings.totalRating) ? -1 : 0));
    }
    else if (this.orderBy === 'A-Z') {
      this.courses = this.courses.slice().sort((a, b) => (a.title_EN > b.title_EN) ? 1 : ((b.title_EN > a.title_EN) ? -1 : 0));
    }
    else {
      this.courses = this.storeCourses;
    }
  }

  onCheckIfUserEnrolled(courseId: number): boolean {
    let isUserEnrolled = false;
    if (this.loaded && this.isAuthenticated) {
      const course = this.courses.find(c => c.id === courseId);
      if (course) {
        if (course.cls.id) {
          const classId = course.cls.id;
          const member = course.cls.members.find(m => m.id === this.userId);
          isUserEnrolled = member ? true : false;
        }
      }
    }
    return isUserEnrolled;
  }

  ngOnDestroy() {
  }
  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
}
