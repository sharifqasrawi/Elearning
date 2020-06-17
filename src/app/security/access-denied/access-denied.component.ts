import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  returnUrl: string = null;

  constructor(
    private route: ActivatedRoute,
    private translate:TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['SECURITY.ACCESS_DENIED']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['SECURITY.ACCESS_DENIED']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['SECURITY.ACCESS_DENIED']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['SECURITY.ACCESS_DENIED']}`);
      });
    });

    this.route.queryParams.subscribe((params:Params) => {
      this.returnUrl = params.returnUrl;
    });
  }

}
