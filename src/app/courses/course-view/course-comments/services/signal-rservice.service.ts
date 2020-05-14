import { Store } from '@ngrx/store';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { environment } from './../../../../../environments/environment';
import * as fromApp from '../../../../store/app.reducer';
import * as HomeCommentsActions from '../store/comments.actions';
import { Comment } from './../../../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {

  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<Comment>();

  constructor(private store: Store<fromApp.AppState>) {
    this.buildConnection();
    this.startConnection();
  }


  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.API_BASE_URL + 'signalHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();
  };

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        // console.log('Hub connection started');
        this.registerSignalEvents();
      })
      .catch(err => {
        // console.log('Error startin hub connection => ' + err);
        setTimeout(() => {
          this.startConnection();
        }, 3000);
      })
  };

  public getHubConnection = () => this.hubConnection;

  private registerSignalEvents() {
    // console.log('start emitting');
    // this.store.dispatch(new HomeCommentsActions.SignalRStart());
    this.hubConnection.on('SignalCommentReceived', (data: Comment) => {
      this.signalReceived.emit(data);
      // this.store.dispatch(new HomeCommentsActions.SignalRDone(data));
    });

    this.hubConnection.on('SignalCommentLikeReceived', (data: Comment) => {
      // this.signalReceived.emit(data);
      console.log('like');
      this.store.dispatch(new HomeCommentsActions.LikeSuccess(data));
    });
  };
}
