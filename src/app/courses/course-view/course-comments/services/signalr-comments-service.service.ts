import { Store } from '@ngrx/store';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { environment } from '../../../../../environments/environment';
import * as fromApp from '../../../../store/app.reducer';
import * as HomeCommentsActions from '../store/comments.actions';
import * as CoursesActions from '../../../../admin/courses/store/courses.actions';
import { Comment } from '../../../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRCommentsService {

  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<Comment>();

  constructor(private store: Store<fromApp.AppState>) {
    this.buildConnection();
    this.startConnection();
  }


  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.API_BASE_URL + 'signalHub')
      .configureLogging(signalR.LogLevel.None)
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
    this.hubConnection.on('SignalCommentReceived', (data: Comment) => {
      // this.signalReceived.emit(data);
      this.store.dispatch(new HomeCommentsActions.SignalRDone(data));
    });

    this.hubConnection.on('SignalCommentUpdatedReceived', (data: Comment) => {
      // this.signalReceived.emit(data);
      this.store.dispatch(new HomeCommentsActions.UpdateSuccess(data));
    });

    this.hubConnection.on('SignalCommentDeletedReceived', (data: Comment) => {
      // this.signalReceived.emit(data);
      this.store.dispatch(new HomeCommentsActions.DeleteSuccess(data));
      // this.store.dispatch(new CoursesActions.DeleteCommentSuccess(data));
    });

    this.hubConnection.on('SignalCommentLikeReceived', (data: Comment) => {
      // this.signalReceived.emit(data);
      this.store.dispatch(new HomeCommentsActions.LikeSuccess(data));
    });

  };
}
