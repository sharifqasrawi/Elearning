import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as fromApp from '../../../store/app.reducer';
import * as MessagesAction from '../store/messages.actions';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.css']
})
export class NewEmailComponent implements OnInit {


  form: FormGroup;
  errors: string[] = null;
  email: string = null;
  sending = false;
  sent = false;

  public Editor = ClassicEditor;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
        this.email = params.email
    });

    this.store.select('messages').subscribe(state => {
      this.sending = state.sending;
      this.errors = state.errors;
      this.sent = state.sent;

    });

    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });

  }

  onSubmit(){
    //const emails: string[] = [this.form.value.email];

    this.store.dispatch(new MessagesAction.SendEmailStart({
      emails: this.form.value.email,
      subject: this.form.value.subject,
      text: this.form.value.message
    }));
  }

}
