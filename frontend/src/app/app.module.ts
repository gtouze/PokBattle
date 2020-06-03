import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AuthpageComponent } from './page/authpage/authpage.component';
import { RegisterpageComponent } from './page/registerpage/registerpage.component';
import { HomeComponent } from './page/home/home.component';
import { PokePageComponent } from './page/poke-page/poke-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { AddAbilitiesComponent } from './component/add-abilities/add-abilities.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { AffichageEquipeComponent } from './page/affichage-equipe/affichage-equipe.component';
import { EquipeComponent } from './component/equipe/equipe.component';
import { CombatComponent } from './page/combat/combat.component';

//import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthpageComponent,
    RegisterpageComponent,
    HomeComponent,
    PokePageComponent,
    AddAbilitiesComponent,
    AffichageEquipeComponent,
    EquipeComponent,
    CombatComponent
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
    MatSortModule,
    MatStepperModule,
    MatSelectModule,
    MatSliderModule,
    MatGridListModule
  ],
  providers: [/*authInterceptorProviders*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
