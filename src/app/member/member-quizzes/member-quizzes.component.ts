import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faSearch, faCheckCircle, faTimesCircle, faEye } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as MemberActions from '../store/member.actions';
import { UserQuiz } from './../../models/userQuiz.model';


@Component({
  selector: 'app-member-quizzes',
  templateUrl: './member-quizzes.component.html',
  styleUrls: ['./member-quizzes.component.css']
})
export class MemberQuizzesComponent implements OnInit {


  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faEye = faEye;

  quizzes: UserQuiz[] = null;
  errors: string[] = null;
  loading = false;

  count = 0;

  displayedColumns: string[] = ['id', 'quizTitle', 'takeDateTime', 'isStarted', 'isOngoing', 'isSubmitted', 'result', 'actions'];
  dataSource: MatTableDataSource<UserQuiz>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new MemberActions.FetchUserQuizzesStart());

    this.store.select('member').subscribe(state => {
      this.quizzes = state.userQuizzes;
      this.loading = state.loadingUserQuizzes;

      this.errors = state.errors;

      this.setTable();
    });
  }



  onRefresh() {
    this.store.dispatch(new MemberActions.FetchUserQuizzesStart());
    this.setTable();
  }


  generateQuizSlug(title: string): string {
    return title.split(' ').join('-').toLowerCase();
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.quizzes);
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
