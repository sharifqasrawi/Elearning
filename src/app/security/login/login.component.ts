import { environment } from './../../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUserCheck, faSlash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


import * as fromApp from '../../store/app.reducer';
import * as loginActions from './store/login.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  faLogin = faUserCheck;
  private subscription: Subscription;

  loading = false;
  sending = false;
  errors = null;
  confirmationLinkSent = false;
  loginForm: FormGroup;
  hidePwd = true;

  constructor(private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.subscription = this.store.select('login').subscribe(loginState => {
      this.loading = loginState.loading;
      this.errors = loginState.errors;
    });

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }



  onSubmit() {
    if (!this.loginForm.valid)
      return;

    this.confirmationLinkSent = false;
    this.store.dispatch(new loginActions.LoginStart({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    ));


    // this.snackBar.open('Welcome ' + this.loginForm.value.username, 'Thanks!',
    //   {
    //     duration: 2000
    //   });

    // this.loginForm.reset();
  }

  resendConfirmationLink() {
    this.sending = true;
    this.http.post(environment.API_BASE_URL + 'account/resend-confirmation',
      {
        email: this.loginForm.value.username
      })
      .subscribe(() => {
        this.confirmationLinkSent = true;
        this.sending = false;
      },
        errorRes => {
          this.sending = false;
          this.errors = errorRes.error.errors;
        })
      ;
  }

  ngOnDestroy() {
    this.loading = false;
    this.errors = null;
    this.sending = false;
    this.confirmationLinkSent = false;
    this.subscription.unsubscribe();

    this.store.dispatch(new loginActions.ClearErrors());

  }
}
