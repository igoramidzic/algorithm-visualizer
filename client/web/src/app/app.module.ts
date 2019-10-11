import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { Ng2OdometerModule } from 'ng2-odometer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot({
      position: ["bottom", "right"],
      timeOut: 2500,
      showProgressBar: false,
      pauseOnHover: true,
      lastOnBottom: true,
      clickToClose: true,

    }),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.baseUrl],
        throwNoTokenError: false,
        skipWhenExpired: true
      }
    }),
    Ng2OdometerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
