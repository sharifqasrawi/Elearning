import { Store } from '@ngrx/store';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { environment } from '../../../../../environments/environment';
import * as fromApp from '../../../../store/app.reducer';
import * as HomeCoursesActions from '../../../store/courses.actions';
import { Course } from '../../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRCoursesService {

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

    this.hubConnection.on('SignalCourseRateReceived', (data: Course) => {
      // this.signalReceived.emit(data);
      this.store.dispatch(new HomeCoursesActions.RateSuccess(data));
    });
  };
}
