import { Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = `${environment.api_url}/products`;

  constructor(private http: HttpClient) {}

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('keyword', keyword)
      .set('category_id', selectedCategoryId.toString());
    return this.http.get<any>(this.apiGetProducts, { params });
 
  }

  getDetailProduct(productId: number) {
    return this.http.get(`${environment.api_url}/products/${productId}`);
  }
  getProductsByIds(productIds: number[]): Observable<Product[]> {
    const params = new HttpParams().set('ids', productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
    
  }
}