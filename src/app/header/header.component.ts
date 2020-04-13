import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHome, faUserAlt, faUserLock, faInfoCircle, faChessKing, faSearch, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as LoginActions from '../security/login/store/login.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faHome = faHome;
  faUser = faUserAlt;
  faLogin = faUserLock;
  faLogout = faUserTimes;
  faAbout = faInfoCircle;
  faChessKing = faChessKing;
  faSearch = faSearch;

  isAuthenticated = false;
  private userSub: Subscription;

  firstName: string = null;
  lastName: string = null;
  isAdmin = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.userSub = this.store
      .select('login')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;

        // Needs work !!!!
        if (user && this.isAuthenticated) {
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.isAdmin = user.isAdmin;
        }
        else {
          this.isAdmin = false;
          this.firstName = null;
          this.lastName = null;
        }
      });
  }

  onLogout() {
    this.store.dispatch(new LoginActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
