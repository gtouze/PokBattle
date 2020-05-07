import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { AuthpageComponent } from './authpage/authpage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
