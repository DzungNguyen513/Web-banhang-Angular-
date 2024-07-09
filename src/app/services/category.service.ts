import { Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = `${environment.api_url}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(page: number, limit: number): Observable<Category[]> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<Category[]>(this.apiGetCategories, { params });
  }
}