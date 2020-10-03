import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//views
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ViewCentralComponent } from './modules/employee/components/view-central/view-central.component';
import { ManageClientsComponent } from './modules/employee/components/manage-clients/manage-clients.component';
import { ManageRepairsComponent } from './modules/employee/components/manage-repairs/manage-repairs.component';
import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './modules/auth/components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'employee',
    component: ViewCentralComponent,
    children: [
      {path: 'manage-clients', component: ManageClientsComponent},
      {path: 'manage-repairs', component: ManageRepairsComponent}
    ]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
