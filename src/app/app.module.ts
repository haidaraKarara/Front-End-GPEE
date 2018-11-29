import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { ClassListComponent } from './class-list/class-list.component';
import { SingleClassComponent } from './class-list/single-class/single-class.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-list/student-form/student-form.component';
import { SingleStudentComponent } from './student-list/single-student/single-student.component';
import { PaymentStatisticsComponent } from './payment-statistics/payment-statistics.component';
import { ClassStatisticsComponent } from './payment-statistics/class-statistics/class-statistics.component';
import { ClassFormComponent } from './class-list/class-form/class-form.component'
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AccueilComponent,
    ClassListComponent,
    SingleClassComponent,
    StudentListComponent,
    StudentFormComponent,
    SingleStudentComponent,
    PaymentStatisticsComponent,
    ClassStatisticsComponent,
    ClassFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    httpInterceptorProviders

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
