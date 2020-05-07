import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import { Course } from './../models/course.model';
import { Category } from './../models/category.model';

import * as fromApp from '../store/app.reducer';
// import * as CoursesActions from '../admin/courses/store/courses.actions';
import * as CategoriesActions from './store/categories.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;

  // courses: Course[] = null;
  categories: Category[] = null;
  storeCategories: Category[] = null;
  errors: string[] = null;
  loading = false;

  searchForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(new CoursesActions.FetchStart());
    this.store.dispatch(new CategoriesActions.FetchStart());

    // this.store.select('courses').subscribe(state => {
    //   this.courses = state.courses;
    //   this.loading = state.loading;
    //   this.errors = state.errors;
    // });

    this.store.select('homeCategories').subscribe(state => {
      this.storeCategories = state.categories;
      this.categories = this.storeCategories;
      this.loading = state.loading;
      this.errors = state.errors;
    });


    this.searchForm = new FormGroup({
      title_EN: new FormControl(null)
    });
  }

  onSearch() {
    const searchKey: string = this.searchForm.value.title_EN;

    if (searchKey == '' || searchKey === null) {
      this.categories = this.storeCategories;
    } else {
      this.categories = this.storeCategories.filter(c => c.title_EN.toLowerCase().includes(searchKey.toLowerCase()));
    }
  }

  onClearSearch() {
    this.searchForm.reset();
    this.onSearch();
  }

  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}
