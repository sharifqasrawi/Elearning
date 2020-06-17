import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {


  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<PrivacyPolicyComponent>,
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
