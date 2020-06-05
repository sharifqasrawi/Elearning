import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { faEnvelopeOpenText, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as MessagesActions from '../admin/messages/store/messages.actions';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  faEnvelopeOpenText = faEnvelopeOpenText;
  faEdit = faEdit;


  form: FormGroup;
  errors: string[] = null;
  sending = false;
  sent = false;


  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.form.get('formArray'); }

  constructor(
    private store: Store<fromApp.AppState>,
    private _formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {

    this.store.select('messages').subscribe(messagesState => {
      this.sending = messagesState.sending;
      this.sent = messagesState.sent;
      this.errors = messagesState.errors
    });

    this.form = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: new FormControl(null, [Validators.required]),
        }),
        this._formBuilder.group({
          email: new FormControl(null, [Validators.required, Validators.email]),
        }),
        this._formBuilder.group({
          subject: new FormControl(null, [Validators.required]),
        }),
        this._formBuilder.group({
          text: new FormControl(null, [Validators.required]),
        }),
      ])
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new MessagesActions.SendStart({
      name: this.form.value.formArray[0].name,
      email: this.form.value.formArray[1].email,
      subject: this.form.value.formArray[2].subject,
      text: this.form.value.formArray[3].text,
    }));

  }

  ngOnDestroy() {
    this.store.dispatch(new MessagesActions.ClearErrors());
    this.store.dispatch(new MessagesActions.ClearStatus());
  }

}
