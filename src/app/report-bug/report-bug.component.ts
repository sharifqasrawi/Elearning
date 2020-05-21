import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faBug } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../store/app.reducer';
import * as ReportsActions from '../admin/reports/store/reports.action';

export interface DialogData {

}

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit {

  faBug = faBug;

  form: FormGroup;

  listSeverities: { level: number, name: string }[] = [
    { level: 0, name: 'Low' },
    { level: 1, name: 'Moderate' },
    { level: 2, name: 'High' },
  ];

  creating = false;
  errors: string[] = null;

  constructor(
    public dialogRef: MatDialogRef<ReportBugComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<fromApp.AppState>
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      severity: new FormControl(1, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });


    this.store.select('reports').subscribe(state => {
      // this.creating = state.creating;
      this.errors = state.errors;
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new ReportsActions.ReportBugStart({
      type: 'bug',
      userFullName: this.form.value.name,
      severity: this.listSeverities.find(s => s.level === +this.form.value.severity).name,
      severityLevel: this.form.value.severity,
      description: this.form.value.description,
    }));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
