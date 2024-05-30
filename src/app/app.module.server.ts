import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { HomeComponent } from './home/home.component';
import { OderComponent } from './oder/oder.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
@NgModule({
  imports: [
    AppModule, // Thêm AppModule vào đây
    ServerModule,
  ],
  bootstrap: [
    // HomeComponent,
    //OderComponent,
    OrderConfirmComponent
  ],
})
export class AppServerModule {}
