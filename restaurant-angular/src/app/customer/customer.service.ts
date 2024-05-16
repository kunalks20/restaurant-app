import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../auth-services/storage-service/storage.service';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080/'];

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any>{
    return this.http.get(BASE_URL[0] + 'api/customer/categories', {
      headers: this.createAuthHeader()
    });
  }

  getProductsByCategory(categoryId: number): Observable<any>{
    return this.http.get(BASE_URL[0] + `api/customer/${categoryId}/products`, {
      headers: this.createAuthHeader()
    });
  }

  // Reservation Operations
  createReservation(reservationDetails: any){
    reservationDetails.customerId = StorageService.getUserId();
    return this.http.post(BASE_URL[0] + 'api/customer/reservation',reservationDetails, {
      headers: this.createAuthHeader()
    });
  }

  getReservationsByUser(): Observable<any> {
    return this.http.get(BASE_URL[0] + `api/customer/reservations/${StorageService.getUserId()}`, {
      headers: this.createAuthHeader()
    });
  }

  createAuthHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization','Bearer ' + StorageService.getToken());
  }
}
