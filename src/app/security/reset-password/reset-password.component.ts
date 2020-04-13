import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  faEdit = faEdit;

  loading = false;
  resetted = false

  resetPwdForm: FormGroup;
  email: string = null;
  token: string = null;
  errors: string[] = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      this.email = params.email,
        this.token = params.token
    });

    this.resetPwdForm = new FormGroup({
      passwordGroup: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        cpassword: new FormControl(null, [Validators.required])
      },
        this.checkPasswords)
    });
  }

  onSubmit() {
    if (!this.resetPwdForm.valid)
      return;

    this.loading = true;
    this.http.post('https://localhost:44383/account/reset-password',
      {
        Email: this.email,
        Password: this.resetPwdForm.value.passwordGroup.password,
        ConfirmPassword: this.resetPwdForm.value.passwordGroup.cpassword,
        Token: this.token.replace(/\s/g, '+') 

      }).subscribe(() => {
        this.loading = false;
        this.resetted = true;
      }, (errorRes: { error: { errors: string[] } }) => {
        this.errors = errorRes.error.errors;
        this.resetted = false;
        this.loading = false;
      });

  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const cpassword = group.get('cpassword').value;

    return password === cpassword ? null : { passwordDoNotMatch: true };
  }

}
