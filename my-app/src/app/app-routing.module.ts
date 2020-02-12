import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent} from './shared/about/about.component';
import { NotFoundComponent} from './not-found/not-found.component';
import { HeaderComponent} from './shared/header/header.component';
import { FooterComponent} from './shared/footer/footer.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: AboutComponent},
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
