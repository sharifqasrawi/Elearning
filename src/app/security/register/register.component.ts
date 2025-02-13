import { TermsComponent } from './../../terms/terms.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as RegisterActions from './store/register.actions';
import { ThemePalette } from '@angular/material/core';

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
  hidePwd = true;
  hideCpwd = true;

  colorPrimary: ThemePalette = 'primary';
  checked = false;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.regForm.get('formArray'); }

  constructor(private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.http.get('https://restcountries.eu/rest/v2/all'
    ).subscribe((resData: any[]) => {
      this.listCountries = resData;
    })

    this.regForm = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: new FormControl(null, [Validators.required]),
          lastName: new FormControl(null, [Validators.required]),
        }),
        this._formBuilder.group({
          email: new FormControl(null, [Validators.required, Validators.email]),
        }),
        this._formBuilder.group({
          country: new FormControl(null, [Validators.required]),
        }),
        this._formBuilder.group({
          gender: new FormControl('custom', [Validators.required]),
        }),
        this._formBuilder.group({
          password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
          cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        }, { validators: this.checkPasswords }),
        this._formBuilder.group({
          terms: new FormControl(null, [Validators.required]),
        }),
      ])
    });


    this.store.select('register').subscribe(regState => {
      this.errors = regState.errors;
      this.loading = regState.loading;
      this.registerd = regState.registerd;
    });


  }

  onSubmit() {
    if (!this.regForm.valid || this.regForm.value.formArray[5].terms === false)
      return;

    this.store.dispatch(new RegisterActions.RegisterStart({
      firstName: this.regForm.value.formArray[0].firstName,
      lastName: this.regForm.value.formArray[0].lastName,
      email: this.regForm.value.formArray[1].email,
      country: this.regForm.value.formArray[2].country,
      gender: this.regForm.value.formArray[3].gender,
      password: this.regForm.value.formArray[4].password,
      confirmPassword: this.regForm.value.formArray[4].cpassword
    }));

  }

  onOpenTerms() {
    const dialogRef = this.dialog.open(TermsComponent, {
      width: '650px',
      disableClose: true
    });
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
