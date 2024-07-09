import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class cartService {
  private cart: Map<number, number> = new Map();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      // Chỉ truy cập localStorage nếu đang chạy trên trình duyệt
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = new Map(JSON.parse(storedCart));
      }
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Chỉ lưu vào localStorage nếu đang chạy trên trình duyệt
      localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
  }
}
