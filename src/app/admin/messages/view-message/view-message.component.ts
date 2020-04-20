import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faUser, faReply, faBackward } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as messagesActions from '../store/messages.actions';
import { Message } from './../../../models/message.model';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {

  faUser = faUser;
  faReply = faReply;
  faBackward = faBackward;

  msgId: number = null;
  message: Message = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.msgId = +params.id;
    });

    this.store.select('messages')
      .pipe(
        map(messagesState => messagesState.messages.find(m => m.id === this.msgId))
      )
      .subscribe(message => {
        this.message = message;
      });

      if(!this.message.isSeen){
        this.store.dispatch(new messagesActions.ChangeSeenStart(this.message.id));
      }
  }

  onGoBack() {
    this.router.navigate(['admin', 'messages']);
  }

}
