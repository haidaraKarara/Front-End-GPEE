import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'Autentification' }
  },
  {
    path: 'accueil',
    component: AccueilComponent,
    data: { title: 'Accueil' }
  },
  { path: '',
    component: AuthComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
