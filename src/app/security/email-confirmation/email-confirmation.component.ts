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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const userId: string = params.userId;
      const token: string = params.token;

      // var uri_enc = encodeURIComponent(params.token);
      // var uri_dec = decodeURIComponent(params.token);

      // console.log(uri_enc);
      // console.log(uri_dec);
      this.http.post(environment.API_BASE_URL + 'account/confirm-email',
        {
          userId: userId,
          token: token.replace(/\s/g, '+') 
        }
      )
        .subscribe(
          (resData) => {
            this.confirmed = true;

            // console.log(resData);
          },
          (errorRes: { error: { errors: string[] } }) => {
            this.errors = errorRes.error.errors;
            // console.log(errorRes);
          });
    });
  }

}
