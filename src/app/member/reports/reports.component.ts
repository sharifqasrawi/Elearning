import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Report } from '../../models/report.model';
import * as fromApp from '../../store/app.reducer';
import * as ReportsActions from '../../admin/reports/store/reports.action';
import { ViewReportComponent } from './view-report/view-report.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  faSearch = faSearch;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  reports: Report[] = null;
  errors: string[] = null;
  loading = false;
  updating = false;

  count = 0;

  displayedColumns: string[] = ['id', 'type', 'severity', 'reportDateTime', 'replyDateTime', 'isReplySeen', 'actions'];
  dataSource: MatTableDataSource<Report>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate:TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['DASHBOARD.REPORTS.REPORTS']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.REPORTS.REPORTS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['DASHBOARD.REPORTS.REPORTS']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['DASHBOARD.REPORTS.REPORTS']}`);
      });
    });


    this.store.dispatch(new ReportsActions.FetchByUserStart());

    this.store.select('reports').subscribe(state => {
      this.reports = state.reports;
      this.loading = state.loading;
      this.updating = state.updating;
      this.errors = state.errors;

      this.setTable();
    });
  }


  onRefresh() {
    this.store.dispatch(new ReportsActions.FetchByUserStart());
    this.setTable();
  }

  onViewReport(id: number) {
    const report = this.reports.find(r => r.id === id);
    
    if (!report.isReplySeen)
      this.onMarkReport(id, true);

    this.dialog.open(ViewReportComponent, {
      width: '600px',
      // height: '500px',
      data: { report: report }
    });
  }

  onMarkReport(id: number, isReplySeen: boolean) {
    this.store.dispatch(new ReportsActions.MarkReplyStart({
      id: id,
      isReplySeen: isReplySeen
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
