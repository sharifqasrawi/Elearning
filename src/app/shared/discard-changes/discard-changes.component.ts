import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discard-changes',
  templateUrl: './discard-changes.component.html',
  styleUrls: ['./discard-changes.component.css']
})
export class DiscardChangesComponent {

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DiscardChangesComponent>) { } // Closing dialog window

  public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

}