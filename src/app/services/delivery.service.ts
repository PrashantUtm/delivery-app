import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../interfaces/delivery';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  baseUrl = 'https://delivery-app-utm-api.herokuapp.com/'

  constructor(
    public http: HttpClient
  ) { }

  getDeliveries() {
    return this.http['get'](`${this.baseUrl}deliveries`);
  }

  getDelivery(id: string) {
    return this.http['get'](`${this.baseUrl}deliveries/${id}`);
  }

  addDelivery(delivery: Delivery) {
    this.setCustomerId(delivery.customer);
    console.log(delivery);
    return this.http['post'](`${this.baseUrl}deliveries`, delivery);
  }

  getAllParcels() {
    return this.http['get'](`${this.baseUrl}parcels`);
  }

  setCustomerId(customer: Customer) {
    customer.id = Math.round(Math.random() * 10);
  }

  getNewDeliveryId() {
    return Math.round(Math.random() * 10).toString();
  }

  updateDeliveryStatus(delivery: Delivery) {
    return this.http['put'](`${this.baseUrl}deliveries/${delivery.id}`, delivery);
  }
}
