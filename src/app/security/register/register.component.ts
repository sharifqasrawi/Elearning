import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as RegisterActions from './store/register.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  faRegister = faUserEdit;
  listCountries: any[] = [];

  regForm: FormGroup;
  errors: { errors: string[] } = null;
  loading = false;
  registerd = false;

  constructor(private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe((resData: any[]) => {
      this.listCountries = resData;
    })

    this.store.select('register').subscribe(regState => {
      this.errors = regState.errors;
      this.loading = regState.loading;
      this.registerd = regState.registerd;
    });

    this.regForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      password: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      },
        [this.checkPasswords])
    });

  }

  onSubmit() {
    if (!this.regForm.valid)
      return;


    this.store.dispatch(new RegisterActions.RegisterStart({
      email: this.regForm.value.email,
      password: this.regForm.value.password.password,
      confirmPassword: this.regForm.value.password.cpassword,
      firstName: this.regForm.value.firstName,
      lastName: this.regForm.value.lastName,
      country: this.regForm.value.country,
      gender: this.regForm.value.gender
    }));

  }


  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const cpassword = group.get('cpassword').value;

    return password === cpassword ? null : { passwordDoNotMatch: true };
  }

  ngOnDestroy() {
    this.store.dispatch(new RegisterActions.ClearErrors());
    this.store.dispatch(new RegisterActions.ClearStatus());
  }
}
