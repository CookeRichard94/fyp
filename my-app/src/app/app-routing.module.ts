import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent} from './shared/about/about.component';
import { NotFoundComponent} from './not-found/not-found.component';
import { SettingsComponent} from './settings/settings.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: AboutComponent},
  { path: 'settings', component: SettingsComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
