import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<TermsComponent>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.currentLang = this.translate.currentLang);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
