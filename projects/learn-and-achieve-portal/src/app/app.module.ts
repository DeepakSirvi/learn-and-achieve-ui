import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerifiedOtpComponent } from './Component/verified-otp/verified-otp.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { ClassMasterManagementComponent } from './Component/class-master-management/class-master-management.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { SubjectManagementComponent } from './Component/subject-management/subject-management.component';
import { QuestionBankComponent } from './Component/question-bank/question-bank.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifiedOtpComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ClassMasterManagementComponent,
    ProfileComponent,
    SubjectManagementComponent,
    QuestionBankComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule ,MatPaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line to include CUSTOM_ELEMENTS_SCHEMA
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
