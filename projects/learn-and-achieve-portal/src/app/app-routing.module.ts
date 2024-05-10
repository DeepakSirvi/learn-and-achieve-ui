import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifiedOtpComponent } from './Component/verified-otp/verified-otp.component';
import { LoginComponent } from './Component/login/login.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ClassMasterManagementComponent } from './Component/class-master-management/class-master-management.component';
import { LoginGuard } from './Gaurd/login.guard';
import { NotLoginGuard } from './Gaurd/not-login.guard';
import { ProfileComponent } from './Component/profile/profile.component';
import { SubjectManagementComponent } from './Component/subject-management/subject-management.component';
import { QuestionBankComponent } from './Component/question-bank/question-bank.component';

const routes: Routes = [
  {
    path:"verifiedOtp/:email",
    component:VerifiedOtpComponent,
    canActivate:[LoginGuard]
  },{
    path:"",
    component:LoginComponent,
    canActivate:[LoginGuard]
  }
  ,{
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[NotLoginGuard],
    children:[
      {
        path:"classMaster",
        component:ClassMasterManagementComponent,
      },{
        path:"",
        component:ClassMasterManagementComponent,    
      },
      {
        path:"profile",
        component:ProfileComponent
      },{
        path:"viewSubject",
        component:SubjectManagementComponent
      },{
        path:"question",
        component:QuestionBankComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
