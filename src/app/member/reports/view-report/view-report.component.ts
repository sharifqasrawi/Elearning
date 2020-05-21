import { Component, OnInit, Inject } from '@angular/core';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { Report } from '../../../models/report.model';

export interface DialogData {
  report: Report;
}

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  
  faBug = faBug;
  badgeClass: string;
  
  
  constructor(
    public dialogRef: MatDialogRef<ViewReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<fromApp.AppState>
  ) { }


  ngOnInit(): void {

    switch (this.data.report.severity) {
      case 'High':
        this.badgeClass = 'badge badge-danger';
        break;
      case 'Moderate':
        this.badgeClass = 'badge badge-warning';
        break;
      case 'Low':
        this.badgeClass = 'badge badge-primary';
        break;
      default:
        this.badgeClass = 'badge badge-primary';
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
