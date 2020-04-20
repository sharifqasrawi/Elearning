import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from '@angular/material/core';

import * as fromApp from '../../../store/app.reducer';
import * as UsersActions from '../store/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {

  editMode = false;

  faUserPlus = faUserPlus;
  faUserEdit = faUserEdit;

  colorPrimary: ThemePalette = 'primary';
  colorAccent: ThemePalette = 'accent';
  colorWarn: ThemePalette = 'warn';
  checked = false;

  listCountries: any[] = [];

  regForm: FormGroup;
  errors: string[] = null;
  loading = false;
  created = false;
  userId: string = null;
  hidePwd = true;
  hideCpwd = true;

  ;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params.userId;
      this.editMode = params.editMode;
    });

    this.store.select('users')
      .subscribe(usersState => {
        this.loading = usersState.loading;
        this.errors = usersState.errors;
        this.created = usersState.created;

        if (this.created) {
          this.regForm.reset();
        
          this.router.navigate(['/admin', 'users']);
          this.snackBar.open('User Saved successfully', 'Okay',
            {
              duration: 2000
            });
        }
      });

    this.http.get('https://restcountries.eu/rest/v2/all').subscribe((resData: any[]) => {
      this.listCountries = resData;
    })

    if (this.editMode) {

      this.store.select('users').pipe(
        map(usersState => usersState.users.find(u => u.id === this.userId))
      )
        .subscribe(user => {
          this.regForm = new FormGroup({
            isAdmin: new FormControl(user.isAdmin),
            isAuthor: new FormControl(user.isAuthor),
            firstName: new FormControl(user.firstName, [Validators.required]),
            lastName: new FormControl(user.lastName, [Validators.required]),
            email: new FormControl(user.email, [Validators.required, Validators.email]),
            emailConfirmed: new FormControl(user.emailConfirmed),
            country: new FormControl(user.country, [Validators.required]),
            gender: new FormControl(user.gender, [Validators.required]),

          });
        })


    } else {
      this.regForm = new FormGroup({
        isAdmin: new FormControl(null),
        isAuthor: new FormControl(null),
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        emailConfirmed: new FormControl(null),
        country: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        password: new FormGroup({
          password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
          cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        },
          [this.checkPasswords])
      });

    }

  }


  onSubmit() {
    if (!this.regForm.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new UsersActions.CreateStart({
        email: this.regForm.value.email,
        password: this.regForm.value.password.password,
        confirmPassword: this.regForm.value.password.cpassword,
        firstName: this.regForm.value.firstName,
        lastName: this.regForm.value.lastName,
        country: this.regForm.value.country,
        gender: this.regForm.value.gender,
        isAdmin: this.regForm.value.isAdmin ?? false,
        isAuthor: this.regForm.value.isAuthor ?? false,
        emailConfirmed: this.regForm.value.emailConfirmed ?? false
      }));

    }
    else {
      this.store.dispatch(new UsersActions.UpdateStart({
        userId: this.userId,
        email: this.regForm.value.email,
        firstName: this.regForm.value.firstName,
        lastName: this.regForm.value.lastName,
        country: this.regForm.value.country,
        gender: this.regForm.value.gender,
        isAdmin: this.regForm.value.isAdmin ?? false,
        isAuthor: this.regForm.value.isAuthor ?? false,
        emailConfirmed: this.regForm.value.emailConfirmed ?? false
      }));


    }
  }

  onCancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: { header: 'Confirm cancel', message: 'Cancel and discard all changes?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/admin', 'users']);
    });

  }

  ngOnDestroy() {
    this.errors = null;
    this.created = false;
    this.loading = false;
    this.store.dispatch(new UsersActions.ClearErrors());
    this.store.dispatch(new UsersActions.ClearStatus());
  }



  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const cpassword = group.get('cpassword').value;

    return password === cpassword ? null : { passwordDoNotMatch: true };
  }
}
