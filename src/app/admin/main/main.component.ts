import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as LoginActions from '../../security/login/store/login.actions';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;


  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  showSubmenuCategories = false;
  showSubmenuCourses = false;
  showSubmenuUsers = false;
  showSubmenuDirs = false;
  showSubmenuMessages = false;
  showSubmenuTags = false;

  navOpened = true;

  userSub: Subscription;
  firstName: string = null;
  lastName: string = null;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    private titleService: Title,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.titleService.setTitle('Admin');

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

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
