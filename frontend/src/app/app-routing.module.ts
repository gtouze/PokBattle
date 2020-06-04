import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterpageComponent } from './page/registerpage/registerpage.component';
import { AuthpageComponent } from './page/authpage/authpage.component';
import { HomeComponent } from './page/home/home.component';
import { PokePageComponent } from './page/poke-page/poke-page.component';
import { AffichageEquipeComponent } from './page/affichage-equipe/affichage-equipe.component';
import { CombatComponent } from './page/combat/combat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'capture', component: PokePageComponent },
  { path: 'equipe', component: AffichageEquipeComponent },
  { path: 'combat', component: CombatComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
