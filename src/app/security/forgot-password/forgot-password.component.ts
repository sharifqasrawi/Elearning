import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { map, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from './../../../environments/environment';
import { of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  faQuestion = faQuestionCircle;
  faCheck = faCheckCircle;

  resetPwdForm: FormGroup;
  emailSent = false;
  sending = false;
  errors: string[] = null;

  constructor(private http: HttpClient, private translate: TranslateService, private titleService: Title) { }

  ngOnInit(): void {
    this.translate.get(['LOGIN.FORGOT_PASSWORD']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['LOGIN.FORGOT_PASSWORD']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['LOGIN.FORGOT_PASSWORD']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['LOGIN.FORGOT_PASSWORD']}`);
      });
    });

    this.resetPwdForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (!this.resetPwdForm.valid)
      return;

    this.sending = true;
    this.http.post(environment.API_BASE_URL + 'account/forgot-password',
      {
        email: this.resetPwdForm.value.email
      },
      {
        headers: new HttpHeaders().append('language', this.translate.currentLang),
        withCredentials: true,
      }
    ).pipe(
      map(resData => {
        this.sending = false;
        this.emailSent = true;
        this.errors = null;
      }),
      catchError(errRes => {
        this.errors = errRes.error.errors;
        this.sending = false;
        this.emailSent = false;
        return of();
      })
    ).subscribe();

  }



}
