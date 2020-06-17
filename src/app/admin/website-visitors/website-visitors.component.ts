import { VisitorDetailsComponent } from './visitor-details/visitor-details.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as AppSettingsActions from '../../AppSettings/store/app-settings.actions';
import { Visit } from './../../models/visit.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-website-visitors',
  templateUrl: './website-visitors.component.html',
  styleUrls: ['./website-visitors.component.css']
})
export class WebsiteVisitorsComponent implements OnInit {

  faSearch = faSearch;
  faEye = faEye;

  visits: Visit[] = null;
  loading = false;
  errors: string[] = null;

  displayedColumns: string[] = ['id', 'ipAddress', 'continent_Name', 'country_Name', 'city', 'dateTime', 'dayVisitsCount', 'actions'];
  dataSource: MatTableDataSource<Visit>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AppSettingsActions.FetchVisitsAdminStart());

    this.store.select('appSettings').subscribe(state => {
      this.visits = state.visits;
      this.loading = state.loadingVisitsAdmin;
      this.errors = state.errorsVisits;

      this.setTable();
    });
  }

  onRefresh() {
    this.store.dispatch(new AppSettingsActions.FetchVisitsAdminStart());
    this.setTable();
  }

  onViewDetails(id: number) {
    const visit = this.visits.find(v => v.id === id);

    this.bottomSheet.open(VisitorDetailsComponent, {
      data: { visit: visit }
    });
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.visits);
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
