import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';


import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { OderComponent } from './components/oder/oder.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http'; 
import { TokenInterceptor } from './interceptors/token.interceptor';
import { withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OderComponent,
    ProductDetailComponent,
    OrderConfirmComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [provideClientHydration(), { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [
    AppComponent,
    //HomeComponent,
     //ProductDetailComponent,
    //OderComponent,
    // OrderConfirmComponent,
    //LoginComponent,
    //RegisterComponent,
  ],
})
export class AppModule {}
