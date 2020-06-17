import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = true;

  constructor(
    private translate:TranslateService,
    private titleService:Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['COMMON.AUTHENTICATION']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['COMMON.AUTHENTICATION']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['COMMON.AUTHENTICATION']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['COMMON.AUTHENTICATION']}`);
      });
    });
  }

  onChangeAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
