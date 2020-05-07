import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AuthpageComponent } from './authpage/authpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { HomeComponent } from './home/home.component';
import { PokePageComponent } from './poke-page/poke-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

//import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthpageComponent,
    RegisterpageComponent,
    HomeComponent,
    PokePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [/*authInterceptorProviders*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
