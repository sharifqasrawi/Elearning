import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as UsersActions from '../../admin/users/store/users.actions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  faEdit = faEdit;

  updating = false;
  updated = false;
  errors: string[] = null;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  hideCurrentPwd = true;
  hideNewPwd = true;
  hideConfirmPwd = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['CHANGE_PASSWORD.CHANGE_PASSWORD']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['CHANGE_PASSWORD.CHANGE_PASSWORD']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['CHANGE_PASSWORD.CHANGE_PASSWORD']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['CHANGE_PASSWORD.CHANGE_PASSWORD']}`);
      });
    });

    this.form = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      password: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      },
        [this.checkPasswords])
    });

    this.store.select('users').subscribe(state => {
      this.updating = state.updating;
      this.updated = state.updated;
      this.errors = state.errors;

      if (this.updated)
        this.form.reset();
    });
  }


  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new UsersActions.ChangePasswordStart({
      currentPassword: this.form.value.currentPassword,
      newPassword: this.form.value.password.password,
      confirmPassword: this.form.value.password.cpassword,
    }));
  }

  ngOnDestroy(){
    this.store.dispatch(new UsersActions.ClearErrors());
    this.store.dispatch(new UsersActions.ClearStatus());
  }


  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const cpassword = group.get('cpassword').value;

    return password === cpassword ? null : { passwordDoNotMatch: true };
  }
}
