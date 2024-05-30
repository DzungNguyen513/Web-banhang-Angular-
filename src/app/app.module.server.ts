import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { HomeComponent } from './home/home.component';
import { OderComponent } from './oder/oder.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
@NgModule({
  imports: [
    AppModule, // Thêm AppModule vào đây
    ServerModule,
  ],
  bootstrap: [
    // HomeComponent,
    //OderComponent,
    //OrderConfirmComponent,
    //LoginComponent,
    //RegisterComponent,
    ProductDetailComponent
  ],
})
export class AppServerModule {}
