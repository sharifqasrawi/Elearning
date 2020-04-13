import { environment } from './../../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUserCheck, faSlash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


import * as fromApp from '../../store/app.reducer';
import * as loginActions from './store/login.actions';
import { HttpClient } from '@angular/common/http';

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

  constructor(private store: Store<fromApp.AppState>,
    private http: HttpClient) { }

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
