import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faBug } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as ReportsActions from '../../store/reports.action';
import { Report } from './../../../../models/report.model';

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

  form: FormGroup;
  replyMode = false;
  updating = false;

  @ViewChild('f') f: FormGroupDirective;

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

    this.form = new FormGroup({
      replyMsg: new FormControl(null, [Validators.required])
    });



    this.store.select('reports').subscribe(state => {
      this.updating = state.updating;

      if (this.updating) {
        this.replyMode = false;
        this.form.reset();
      }
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new ReportsActions.ReplyReportStart({
      id: this.data.report.id,
      replyMessage: this.form.value.replyMsg
    }));
  }


  onSwitchMode() {
    this.replyMode = !this.replyMode;


    if (!this.replyMode) {
      this.form.reset();
    }
    else {
      if (this.data.report.replyMessage) {
        this.form.setValue({
          replyMsg: this.data.report.replyMessage
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
