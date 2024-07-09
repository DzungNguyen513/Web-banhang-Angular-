import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import e from 'express';
import { environment } from '../../enviroments/enviroment';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products: Product[] = []
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = []; 
  totalPage: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';
  selectedCategoryId: number = 0;
  categories: Category[] = [];  

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories(1, 100);
  }

  searchProduct() {
    if(this.keyword === '') {
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }
    else {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }
    
  }
  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => { 
        this.categories = categories;
      },
      complete: () => {
        // Logic khi hoàn thành
      },
      error: (error: any) => {
        console.log(error);
        // Xử lý lỗi cụ thể, ví dụ hiển thị thông báo lỗi
      }
    })


  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword,selectedCategoryId,page, limit).subscribe({
      next: (response: any) => {
        if (response.productResponses && Array.isArray(response.productResponses)) {
          response.productResponses.forEach((product: Product) => {
            product.url = `${environment.api_url}/products/images/${product.thumbnail}`;
            console.log(response.productResponses);
          });
          this.products = response.productResponses;
          this.totalPage = response.totalPages; // Adjusted to totalPages
          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPage);
        } else {
          console.error('Invalid response structure: ', response);
          // Additional handling for invalid response
        }
      },
      complete: () => {
        // Logic khi hoàn thành
      },
      error: (error: any) => {
        debugger;
        console.log(error);
        // Xử lý lỗi cụ thể, ví dụ hiển thị thông báo lỗi
      }
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
}
onProductClick(id: number){
  this.router.navigate(['/product-detail', id]);}

}