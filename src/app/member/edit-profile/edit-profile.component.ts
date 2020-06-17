import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromApp from '../../store/app.reducer';
import * as UsersActions from '../../admin/users/store/users.actions';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  faUserEdit = faUserEdit;

  listCountries: string[] = null;
  form: FormGroup;
  user: User = null;
  loading = false;
  updating = false;
  updated = false;
  errors: string[] = null;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private translate:TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['EDIT_PROFILE.EDIT_PROFILE']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['EDIT_PROFILE.EDIT_PROFILE']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['EDIT_PROFILE.EDIT_PROFILE']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['EDIT_PROFILE.EDIT_PROFILE']}`);
      });
    });

    this.http.get('https://restcountries.eu/rest/v2/all').subscribe((resData: any[]) => {
      this.listCountries = resData;
    });

    this.store.dispatch(new UsersActions.FetchUserStart());

    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    });


    this.store.select('users').subscribe(state => {
      this.user = state.user;
      this.loading = state.loading;
      this.updating = state.updating;
      this.updated = state.updated;
      this.errors = state.errors;

      if (this.user) {
        this.form.setValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          country: this.user.country,
          gender: this.user.gender,
        });
      }
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new UsersActions.UpdateProfileStart({
      userId: this.user.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      country: this.form.value.country,
      gender: this.form.value.gender,
    }));
  }


  ngOnDestroy(){
    this.store.dispatch(new UsersActions.ClearErrors());
    this.store.dispatch(new UsersActions.ClearStatus());
  }
}
