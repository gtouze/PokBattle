import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AuthpageComponent } from './authpage/authpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { HomeComponent } from './home/home.component';
//import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthpageComponent,
    RegisterpageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [/*authInterceptorProviders*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
