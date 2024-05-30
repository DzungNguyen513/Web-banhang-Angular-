import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { OderComponent } from './oder/oder.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OderComponent,
    ProductDetailComponent,
    OrderConfirmComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [
    //HomeComponent,
    //ProductDetailComponent,
    //OderComponent,
    // OrderConfirmComponent,
    //LoginComponent.
    RegisterComponent
  ]
})
export class AppModule { }
