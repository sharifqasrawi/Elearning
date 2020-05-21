import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  faHome,
  faUserAlt,
  faUserLock,
  faInfoCircle,
  faChessKing,
  faSearch,
  faUserTimes,
  faEnvelopeOpenText,
  faWrench,
  faUserEdit,
  faEye
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as fromApp from '../store/app.reducer';
import * as LoginActions from '../security/login/store/login.actions';
import { MediaMatcher } from '@angular/cdk/layout';

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
  faEnvelopeOpenText = faEnvelopeOpenText;
  faWrench = faWrench;
  faUserEdit = faUserEdit;
  faEye = faEye;

  mobileQuery: MediaQueryList;

  isAuthenticated = false;
  private userSub: Subscription;

  firstName: string = null;
  lastName: string = null;
  isAdmin = false;

  navOpened = false;
  showSubmenuUser = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 993px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

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

    this.snackBar.open('Good Bye !! ', 'Thanks!',
      {
        duration: 2000
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
