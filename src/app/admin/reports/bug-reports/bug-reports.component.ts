import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ViewReportComponent } from './view-report/view-report.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as ReportsActions from '../store/reports.action';
import { Report } from './../../../models/report.model';

@Component({
  selector: 'app-bug-reports',
  templateUrl: './bug-reports.component.html',
  styleUrls: ['./bug-reports.component.css']
})
export class BugReportsComponent implements OnInit {


  faSearch = faSearch;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  reports: Report[] = null;
  errors: string[] = null;
  loading = false;
  updating = false;

  count = 0;

  displayedColumns: string[] = ['id', 'type', 'severity', 'userId', 'userFullName', 'userEmail', 'reportDateTime', 'replyDateTime', 'isSeen'];
  dataSource: MatTableDataSource<Report>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate:TranslateService,
    private titleService:Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['ADMINISTRATION.REPORTS.REPORTS']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.REPORTS.REPORTS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['ADMINISTRATION.REPORTS.REPORTS']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.REPORTS.REPORTS']}`);
      });
    });


    this.store.dispatch(new ReportsActions.FetchStart());

    this.store.select('reports').subscribe(state => {
      this.reports = state.reports;
      this.loading = state.loading;
      this.updating = state.updating;
      this.errors = state.errors;

      this.setTable();
    });
  }


  onRefresh() {
    this.store.dispatch(new ReportsActions.FetchStart());
    this.setTable();
  }

  onViewReport(id: number) {
    const report = this.reports.find(r => r.id === id);

    if (!report.isSeen)
      this.onMarkReport(id, true);

    this.dialog.open(ViewReportComponent, {
      width: '600px',
      disableClose: true,
      data: { report: report }
    });
  }

  onMarkReport(id: number, isSeen: boolean) {
    this.store.dispatch(new ReportsActions.MarkReportStart({
      id: id,
      isSeen: isSeen
    }));
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.reports);
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
