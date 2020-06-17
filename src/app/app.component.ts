import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';


import * as fromApp from './store/app.reducer';
import * as LoginActions from './security/login/store/login.actions';
import * as AppSettingsActions from './AppSettings/store/app-settings.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'Q E-Learning';

  constructor(private store: Store<fromApp.AppState>,
  ) {


  }

  ngOnInit() {
    this.store.dispatch(new LoginActions.AutoLogin());

    this.store.dispatch(new AppSettingsActions.VisitStart());
  }
}
