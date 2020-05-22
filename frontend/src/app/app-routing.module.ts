import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { AuthpageComponent } from './authpage/authpage.component';
import { HomeComponent } from './home/home.component';
import { PokePageComponent } from './poke-page/poke-page.component';
import { AffichageEquipeComponent } from './affichage-equipe/affichage-equipe.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'capture', component: PokePageComponent },
  { path: 'equipe', component: AffichageEquipeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
