import { faSearch, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CourseRating } from './../../../../models/courseRating.model';
import { Course } from './../../../../models/course.model';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit, OnDestroy {

  faSearch = faSearch;
  faMale = faMale;
  faFemale = faFemale;
  colorPrimary: ThemePalette = 'primary';

  courseId: number = null;
  course: Course = null;
  @Input() trashed: boolean;

  totalRatingsN = 0.0;
  totalRatings: string = null;
  ratings: CourseRating[] = null;


  displayedColumns: string[] = ['id', 'userId', 'userName', 'userGender', 'userCountry', 'value', 'oldValue', 'rateDateTime', 'rateDateTimeUpdated'];
  dataSource: MatTableDataSource<CourseRating>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.courseId;
    });

    this.store.select('courses')
      .subscribe(state => {

        if (!this.trashed) {
          this.course = state.courses.find(c => c.id === this.courseId);
        }
        else {
          this.course = state.trashedCourses.find(c => c.id === this.courseId);
        }

        if (this.course) {
          this.totalRatingsN = this.course.ratings.totalRating;
          this.totalRatings = this.course.ratings.totalRating.toFixed(1);
          this.ratings = [...this.course.ratings.ratings];
          this.setTable();
        }
      });
  }


  getImage(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  }

  getSanitizedHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  private setTable() {

    this.dataSource = new MatTableDataSource(this.ratings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
  }
}
