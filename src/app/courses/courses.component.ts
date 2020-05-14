import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
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
export class CoursesComponent implements OnInit {

  faSearch = faSearch;
  faThumbsUp = faThumbsUp;

  courses: Course[] = null;
  storeCourses: Course[] = null;
  errors: string[] = null;
  categoryId: number = null;
  categoryTitle: string = null;
  loading = false;

  categoryEmpty = false;

  searchForm: FormGroup;
  levels: string[] = ['All', 'Basic', 'Medium', 'Advanced'];
  level: string;

  languages: string[] = ['All', 'Arabic', 'English', 'French'];
  language: string;

  breadcrumbLinks: { url?: string, label: string }[];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = +params.categoryId;

      this.categoryTitle = (params.categorySlug as string).split('-').join(' ');

      this.breadcrumbLinks = [
        { url: '/home', label: 'Home' },
        { label: `${this.categoryTitle}` },
      ];
    });

    // this.route.queryParams.subscribe((params: Params) => {
    //   this.categoryTitle = params.category;
    // });

    this.store.dispatch(new HomeCoursesActions.FetchStart({ categoryId: this.categoryId }));

    this.store.select('homeCourses').subscribe(state => {
      this.storeCourses = state.courses;
      this.courses = this.storeCourses;
      this.loading = state.loading;
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

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
}
