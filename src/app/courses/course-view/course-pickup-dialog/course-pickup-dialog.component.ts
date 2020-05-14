import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  currentSessionTitle: string,
  sessionUrl: string
}


@Component({
  selector: 'app-course-pickup-dialog',
  templateUrl: './course-pickup-dialog.component.html',
  styleUrls: ['./course-pickup-dialog.component.css']
})
export class CoursePickupDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CoursePickupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }



  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
