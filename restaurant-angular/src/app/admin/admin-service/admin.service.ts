import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../auth-services/storage-service/storage.service';

const BASE_URL = ['http://localhost:8080/']

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  postCategory(categoryDto: any): Observable<any>{
    return this.http.post(BASE_URL[0] + 'api/admin/category', categoryDto, {
      headers: this.createAuthHeader()
    });
  }

  getAllCategories(): Observable<any>{
    return this.http.get(BASE_URL[0] + 'api/admin/categories', {
      headers: this.createAuthHeader()
    });
  }

  addProduct(productDto: any, categoryId: number): Observable<any>{
    return this.http.post(BASE_URL[0] + `api/admin/${categoryId}/product`, productDto, {
      headers: this.createAuthHeader()
    });
  }

  getProductsByCategory(categoryId: number): Observable<any>{
    return this.http.get(BASE_URL[0] + `api/admin/${categoryId}/products`, {
      headers: this.createAuthHeader()
    });
  }

  deleteProduct(productId: number) {
    return this.http.delete(BASE_URL[0] + `api/admin/products/${productId}`, {
      headers: this.createAuthHeader()
    });
  }

  getProductById(productId: number): Observable<any>{
    return this.http.get(BASE_URL[0] + `api/admin/product/${productId}`, {
      headers: this.createAuthHeader()
    });
  }

  updateProductDetails(productDto: any, productId: number): Observable<any>{
    return this.http.put(BASE_URL[0] + `api/admin/product/${productId}`, productDto, {
      headers: this.createAuthHeader()
    });
  }

  createAuthHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization','Bearer ' + StorageService.getToken());
  }

  getReservations(): Observable<any> {
    return this.http.get(BASE_URL[0] + `api/admin/reservations`, {
      headers: this.createAuthHeader()
    });
  }

  changeReservationStatus(id:number, status: string): Observable<any> {
    return this.http.get(BASE_URL[0] + `api/admin/change-reservation-status?id=${id}&status=${status}`, {
      headers: this.createAuthHeader()
    });
  }


}
