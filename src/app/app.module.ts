import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './Services/interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatSliderModule } from '@angular/material/slider';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("919061506528-n3dtp027at0bp6hfekboq03rocso1b7b.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("526721987902589")
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],  
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      /**iluud key */
      // apiKey: 'AIzaSyA5Tn7ApmS7XCMUxGsjCFMydWFmsA8MAd4',
      // apiKey: 'AIzaSyDihEsWVNXKTbe6k_nRHartfnuigCsYNQM',
      /**hospital key */
      apiKey: "AIzaSyBn97G5qtvgkxqkq1qeLPLUdeDQcPWyC5s", 

      libraries: ['places']
    }),
    NgbModule,
    AppRoutingModule, NgxUiLoaderModule,
    BrowserAnimationsModule,SocialLoginModule,ReactiveFormsModule, FormsModule, HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2500,

      preventDuplicates: true
    }),
    MatSliderModule,
  

  ],
  providers: [
    { provide: AuthServiceConfig,useFactory: provideConfig },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
