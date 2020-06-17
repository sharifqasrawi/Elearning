import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Visit } from './../../../models/visit.model';

export interface DialogData {
  visit: Visit
}

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.css']
})
export class VisitorDetailsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VisitorDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }
}
