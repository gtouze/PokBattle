import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthpageComponent } from './page/authpage/authpage.component';
import { RegisterpageComponent } from './page/registerpage/registerpage.component';
import { HomeComponent } from './page/home/home.component';
import { PokePageComponent } from './page/poke-page/poke-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAbilitiesComponent } from './component/add-abilities/add-abilities.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { AffichageEquipeComponent } from './page/affichage-equipe/affichage-equipe.component';
import { EquipeComponent, PopupModifierCapacite } from './component/equipe/equipe.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';
import { MatButtonModule } from '@angular/material/button';
import { CombatComponent } from './page/combat/combat.component';
import { VersusComponent } from './component/versus/versus.component';

// import { authInterceptorProviders } from './_helpers/auth.interceptor';

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
    PokemonComponent,
    PopupModifierCapacite,
    CombatComponent,
    VersusComponent
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
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatSliderModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [/*authInterceptorProviders*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
