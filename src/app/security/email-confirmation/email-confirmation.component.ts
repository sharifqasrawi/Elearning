import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  confirmed = false;
  errors: string[] = null;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['COMMON.EMAIL_CONFIRMATION']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['COMMON.EMAIL_CONFIRMATION']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['COMMON.EMAIL_CONFIRMATION']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['COMMON.EMAIL_CONFIRMATION']}`);
      });
    });

    this.route.queryParams.subscribe((params: Params) => {
      const userId: string = params.userId;
      const token: string = params.token;

      this.http.post(environment.API_BASE_URL + 'account/confirm-email',
        {
          userId: userId,
          token: token.replace(/\s/g, '+')
        },
        {
          headers: new HttpHeaders().append('language', this.translate.currentLang),
          withCredentials: true,
        }
      )
        .subscribe(
          (resData) => {
            this.confirmed = true;
          },
          (errorRes: { error: { errors: string[] } }) => {
            this.errors = errorRes.error.errors;
          });
    });
  }

}
