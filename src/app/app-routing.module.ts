import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { OderComponent } from "./components/oder/oder.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'product-detail/:id', component: ProductDetailComponent},
    {path: 'order', component: OderComponent},
    {path: 'order-confirm/:id', component: OrderConfirmComponent}, 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }