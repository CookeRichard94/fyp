import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent} from './shared/about/about.component';
import { NotFoundComponent} from './not-found/not-found.component';
import { SettingsComponent} from './settings/settings.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { ProductComponent } from './user/product/product.component';
import { LoginComponent } from './user/login/login.component';
import {AuthGuardService} from './Services/auth-guard.service';
import {AuthGuardAdminService} from './Services/auth-guard-admin.service';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: LoginComponent},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
  { path: 'admin', component: AdmintabComponent, canActivate: [AuthGuardAdminService]},
  { path: 'product', component: ProductComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
