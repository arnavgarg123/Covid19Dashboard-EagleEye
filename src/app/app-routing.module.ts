import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AuthGuard } from './guards/auth.guard';
import { CasesComponent } from './cases/cases.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';

import { ActionDetectComponent } from './action-detect/action-detect.component';
import { ProximityComponent } from './proximity/proximity.component';
const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "dash", component: DashboardadminComponent },
  { path: "cases", component: CasesComponent },
  { path: "signup", component: SignupComponent },
  { path: "action", component: ActionDetectComponent },
  { path: "proximity", component: ProximityComponent },
  { path: "dash1", component: DashboardComponent },
  { path: "", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
