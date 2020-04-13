import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from './../../../environments/environment';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
        } 
      )
      .subscribe(() => {
        this.emailSent = true;
        this.sending = false;
      });
  }


  
}
