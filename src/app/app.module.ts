import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import * as fromApp from './store/app.reducer';
import { LoginEffects } from './security/login/store/login.effects';
import { RegisterEffects } from './security/register/store/register.effects';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { UsersEffects } from './admin/users/store/users.effects';
import { MaterialModule } from './material-module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessagesEffects } from './admin/messages/store/messages.effects';
import { CategoriesEffects } from './admin/categories/store/categories.effects';
import { LayoutComponent } from './layout/layout.component';
import { DirectoriesEffects } from './admin/directories/store/directories.effects';
import { FilesEffects } from './admin/files/store/files.effects';
// import { AuthInterceptorService } from './security/auth-interceptor.service';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AboutmeComponent,
    ContactUsComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      LoginEffects,
      RegisterEffects, 
      UsersEffects, 
      MessagesEffects, 
      CategoriesEffects, 
      DirectoriesEffects,
      FilesEffects
    ]),
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NotifierModule.withConfig(customNotifierOptions),
    SharedModule,
    SecurityModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
