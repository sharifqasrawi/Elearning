import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Like } from './../../../../models/like.model';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-course-likes',
  templateUrl: './course-likes.component.html',
  styleUrls: ['./course-likes.component.css']
})
export class CourseLikesComponent implements OnInit {

  faSearch = faSearch;

  courseId: number = null;
  likes: Like[] = null;
  count = 0;

  displayedColumns: string[] = ['id', 'userFullName', 'likeDateTime'];
  dataSource: MatTableDataSource<Like>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.courseId;
    });

    this.store.select('courses')
      .pipe(map(state => state.courses.find(c => c.id === this.courseId).likes))
      .subscribe(likes => {
        this.likes = likes;
        this.count = likes.length;
        this.setTable();
      });

  }



  private setTable() {

    this.dataSource = new MatTableDataSource(this.likes);
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

}
