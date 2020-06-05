import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faBug, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { DiscardChangesComponent } from './../shared/discard-changes/discard-changes.component';
import * as fromApp from '../store/app.reducer';
import * as ReportsActions from '../admin/reports/store/reports.action';

export interface DialogData {

}

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit, OnDestroy {

  faBug = faBug;
  faCheckCircle = faCheckCircle;

  isAuthenticated = false;

  form: FormGroup;
  wasFormChanged = false;

  listSeverities: { level: number, name: string }[];

  creating = false;
  created = false;
  errors: string[] = null;

  constructor(
    public dialogRef: MatDialogRef<ReportBugComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }



  ngOnInit(): void {
    this.translate.get(['REPORT_BUG.LOW', 'REPORT_BUG.MODERATE', 'REPORT_BUG.HIGH']).subscribe(trans => {
      this.listSeverities = [
        { level: 0, name: trans['REPORT_BUG.LOW'] },
        { level: 1, name: trans['REPORT_BUG.MODERATE'] },
        { level: 2, name: trans['REPORT_BUG.HIGH'] },
      ];
    });


    let userFullName = null;
    let userEmail = null;
    this.store.select('login').subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      if (state.isAuthenticated) {
        userFullName = state.user.firstName + ' ' + state.user.lastName;
        userEmail = state.user.email;
      }
    });

    this.store.select('reports').subscribe(state => {
      this.creating = state.creating;
      this.created = state.created;
      this.errors = state.errors;
    });

    this.form = new FormGroup({
      name: new FormControl(userFullName, [Validators.required]),
      email: new FormControl(userEmail, [Validators.required, Validators.email]),
      severity: new FormControl(1, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });

  }

  onSubmit() {
    this.markAsDirty(this.form);
    if (!this.form.valid)
      return;

    this.store.dispatch(new ReportsActions.ReportBugStart({
      type: 'bug',
      userFullName: this.form.value.name,
      userEmail: this.form.value.email,
      severity: this.listSeverities.find(s => s.level === +this.form.value.severity).name,
      severityLevel: this.form.value.severity,
      description: this.form.value.description,
    }));
  }


  formChanged() {
    this.wasFormChanged = true;
  }

  onCancel(): void {
    if (this.form.dirty) {
      const dialogRef = this.dialog.open(DiscardChangesComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ReportsActions.ClearErrors());
    this.store.dispatch(new ReportsActions.ClearStatus());
  }
}
