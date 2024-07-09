import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { cartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../enviroments/enviroment';
import { OrderResponse } from '../../responses/order/order.response';
import { OrderService } from '../../services/order.service';
import { OrderDetail } from '../../models/order.detail';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit{
  cartItems: {product: Product, quantity: number}[] = [];
  totalAmount: number = 0;
  couponCode: string = '';
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  };
 
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderDetail();
  }
  getOrderDetail(): void {
    debugger;
    const  orderId = 10;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2],
        );
        debugger;
        this.orderResponse.order_details = response.order_details.map((order_detail: OrderDetail) => {
          order_detail.product.thumbnail = `${environment.api_url}/products/images/${order_detail.product.thumbnail}`;
          return order_detail;
        });
        
        this.orderResponse.total_money = response.total_money;  
        this.orderResponse.status = response.status;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.shipping_address = response.shipping_address;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2],
        );
        this.orderResponse.payment_method = response.payment_method;
      },
      complete: () => {
        debugger;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  // calculateTotal(): void {
  //   this.totalAmount = this.cartItems.reduce((total, item) => {
  //     return total + item.product.price * item.quantity;
  //   }, 0);
  // }
}
