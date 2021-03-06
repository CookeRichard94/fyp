import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutComponent } from './shared/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material.module';
import { SettingsComponent} from './settings/settings.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SetproductComponent } from './admin/setproduct/setproduct.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { AdminordersComponent } from './admin/adminorders/adminorders.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';
import { AdmincartsComponent } from './admin/admincarts/admincarts.component';
import { OrdersComponent } from './user/orders/orders.component';
import { CartComponent } from './user/cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user/user.component';
import { ProductComponent } from './user/product/product.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './user/signup/signup.component';
import { UploadComponent } from './shared/upload/upload.component';
import { FileSizePipe } from './shared/upload/filesize.pipe';
import { UploadDirective } from './shared/upload/upload.directive';
import { StarReviewComponent } from './star-review/star-review.component';
import { StarService } from './Services/star.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    SettingsComponent,
    ShoppingCartComponent,
    SetproductComponent,
    AdmintabComponent,
    AdminordersComponent,
    AdminusersComponent,
    AdmincartsComponent,
    OrdersComponent,
    CartComponent,
    LoginComponent,
    UserComponent,
    ProductComponent,
    SignupComponent,
    UploadComponent,
    FileSizePipe,
    UploadDirective,
    StarReviewComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'fyp'),
    CommonModule
  ],
  providers: [StarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
