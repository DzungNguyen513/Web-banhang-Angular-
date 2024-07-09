import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductImage } from '../../models/product-image';
import { environment } from '../../enviroments/enviroment';
import { cartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0; 
  quantity: number = 1;
  constructor(private productService: ProductService, private cartService: cartService, private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    // Lấy productId từ URL      
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    debugger
    //this.cartService.clearCart();
    //const idParam = 9 //fake tạm 1 giá trị
    if (idParam !== null) {
      this.productId = +idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {            
          // Lấy danh sách ảnh sản phẩm và thay đổi URL
          debugger
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image:ProductImage) => {
              const url = product_image.image_url;
              const prefix = `${environment.api_url}/products/images/`;
              if (url.includes(prefix)) {
                const result = url.substring(prefix.length);
                product_image.image_url= `${environment.api_url}/products/images/${result}`;
              } else {
                product_image.image_url = `${environment.api_url}/products/images/${url}`;
              }
              
            });
          }            
          debugger
          this.product = response 
          this.showImage(0);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching detail:', error);
        }
      });    
    } else {
      console.error('Invalid productId:', idParam);
    }      
  }
  showImage(index: number): void {
    debugger
    if (this.product && this.product.product_images && 
        this.product.product_images.length > 0) {
      // Đảm bảo index nằm trong khoảng hợp lệ        
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }        
      // Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }


thumbnailClick(index: number) {
    debugger
    // Gọi khi một thumbnail được bấm
    this.currentImageIndex = index; // Cập nhật currentImageIndex
}

nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
}

previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
}

addToCart(): void {
  debugger
  if(this.product) {
    this.cartService.addToCart(this.product.id, this.quantity);
  }else {
    console.log('không thể thêm sản phẩm vào giỏ hàng vì sản phẩm không tồn tại');
  }
}

increaseQuantity(): void {
  this.quantity++;
}
decreaseQuantity(): void {
  if(this.quantity > 1) {
    this.quantity--;
  }
}
buyNow(): void {  
  this.router.navigate(['/order']);
} 
}

