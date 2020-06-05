import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';


import * as fromApp from './store/app.reducer';
import * as LoginActions from './security/login/store/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'QASRAWI';

  constructor(private store: Store<fromApp.AppState>,
            // public translate: TranslateService
  ) {
    // translate.addLangs(['en', 'fr']);
    // translate.setDefaultLang('en');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }

  ngOnInit() {
    this.store.dispatch(new LoginActions.AutoLogin());
  }
}
