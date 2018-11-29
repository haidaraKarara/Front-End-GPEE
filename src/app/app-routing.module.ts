import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthComponent } from './auth/auth.component';
import { ClassListComponent } from './class-list/class-list.component';
import { SingleClassComponent } from './class-list/single-class/single-class.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SingleStudentComponent } from './student-list/single-student/single-student.component';
import { StudentFormComponent } from './student-list/student-form/student-form.component';
import { PaymentStatisticsComponent } from './payment-statistics/payment-statistics.component';
import { ClassStatisticsComponent } from './payment-statistics/class-statistics/class-statistics.component';
import { ClassFormComponent } from './class-list/class-form/class-form.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: AccueilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes',
    component: ClassListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes/new',
    component: ClassFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes/view/:id', // class id
    component: SingleClassComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students/view/:id', // student id
    component: SingleStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students/new',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment-statistics',
    component: PaymentStatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment-statistics/view/:id', //class id
    component: ClassStatisticsComponent,
    canActivate: [AuthGuard],
  },
  { path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
