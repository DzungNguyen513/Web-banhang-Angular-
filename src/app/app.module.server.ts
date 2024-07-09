import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { HomeComponent } from './components/home/home.component';
import { OderComponent } from './components/oder/oder.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AppComponent } from './app/app.component';
@NgModule({
  imports: [
    AppModule, // Thêm AppModule vào đây
    ServerModule,
  ],
  bootstrap: [
    AppComponent,
    // HomeComponent,
    //OderComponent,
    // OrderConfirmComponent,
    //LoginComponent,
    //RegisterComponent,
    //ProductDetailComponent
  ],
})
export class AppServerModule {}
