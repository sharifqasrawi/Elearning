import { AppRating } from './../../models/appRating.model';
import { Store } from '@ngrx/store';
import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { environment } from './../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as AppSettingsActions from '../store/app-settings.actions';

@Injectable({
  providedIn: 'root'
})
export class SignalRAppService {

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

    this.hubConnection.on('SignalAppRateReceived', (data: { ratings: { total: number, ratings: AppRating[] } }) => {
      this.store.dispatch(new AppSettingsActions.RateSuccess(data));
    });
  };
}
