import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as LoginActions from './security/login/store/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QASRAWI';
  userId: string = null;
  userAdmin = false;

  constructor(private store: Store<fromApp.AppState>, private http: HttpClient) { }

  ngOnInit() {
    this.store.dispatch(new LoginActions.AutoLogin());

    // this.store.select('login').subscribe(authState => {
    //   if (authState) {
    //     this.userId = authState.user.Id;
    //   }
    // })

    // this.http.get('https://localhost:44383/users/user-roles',
    //   {
    //     params: new HttpParams().set('id', this.userId)
    //   }).subscribe((res: { userRoles: { isAdmin: boolean, isAuthor: boolean } }) => {
    //     this.userAdmin = res.userRoles.isAdmin;
        
    //     this.store.dispatch(new LoginActions.SetAdmin(res.userRoles.isAdmin));
    //   });


  }
}
