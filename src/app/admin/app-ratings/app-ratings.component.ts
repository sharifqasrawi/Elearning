import { faSearch, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import * as fromApp from '../../store/app.reducer';
import * as AppSettingsActions from '../../AppSettings/store/app-settings.actions';
import { AppRating } from './../../models/appRating.model';

@Component({
  selector: 'app-app-ratings',
  templateUrl: './app-ratings.component.html',
  styleUrls: ['./app-ratings.component.css']
})
export class AppRatingsComponent implements OnInit {

  faSearch = faSearch;
  faMale = faMale;
  faFemale = faFemale;

  ratings: AppRating[] = null;
  totalN = 0.0;
  total: string = null;
  loading = false;
  errors: string[] = null;

  displayedColumns: string[] = ['id', 'userId', 'userName', 'userGender', 'userCountry', 'value', 'oldValue', 'rateDateTime', 'rateDateTimeUpdated'];
  dataSource: MatTableDataSource<AppRating>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AppSettingsActions.FetchRateStart());

    this.store.select('appSettings').subscribe(state => {
      this.ratings = state.ratings;
      this.totalN = state.total;
      this.total = state.total.toFixed(1);
      this.loading = state.loading;
      this.errors = state.errors;

      this.setTable();
    });
  }

  onRefresh() {
    this.store.dispatch(new AppSettingsActions.FetchRateStart());
    this.setTable();
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

}
