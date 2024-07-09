import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { cartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { environment } from '../../enviroments/enviroment';
import { OrderService } from '../../services/order.service';
import { OrderDTO } from '../../dtos/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-oder',
  templateUrl: './oder.component.html',
  styleUrl: './oder.component.scss'
})
export class OderComponent implements OnInit{
  orderForm: FormGroup;
  cartItems: {product: Product, quantity: number}[] = [];
  coupeonCode: string = '';
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 1,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: []
  };
  constructor(private orderService: OrderService, private productService: ProductService, private cartService: cartService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      note: [''],
      payment_method: ['cod'],
      shipping_method: ['express'],
      coupon_code: ['']
    });
  }

  ngOnInit(): void {
    debugger;
    // Lấy danh sách sản phẩm từ giỏ hàng
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); // Chuyển danh sách ID từ Map giỏ hàng

    // Gọi service để lấy thông tin sản phẩm dựa trên danh sách ID
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger;
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = productIds.map((productId) => {
          debugger;
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.api_url}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
        console.log('haha');
      },
      complete: () => {
        debugger;
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching details:', error);
      }
    });
  }
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
  placeOrder() {
    if(this.orderForm.valid) {
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value,
        
      };
      this.orderData.cart_items = this.cartItems.map((cartItem) => {
        return {
          product_id: cartItem.product.id,
          quantity: cartItem.quantity
        };
      });
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response) => {
          debugger;
          console.log('Order placed:', response);
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error:any) => {
          debugger;
          console.error('Error placing order:', error);
        }
      });
    }
    else {  
      alert('Dữ liêu không hợp lệ');
    }
    
  }

}
