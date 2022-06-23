import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../interfaces/delivery';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  baseUrl = 'https://delivery-app-utm-api.herokuapp.com/'

  private deliveryList: Delivery[] = [
    {
      id: '1',
      date: new Date(2022, 5 ,28),
      parcels: [ 1, 2 ],
      customer: {
        id: 1,
        name: 'John Doe',
        address: '7, This Street, City',
        phoneNumber: '+230 5 777 6666'
      },
      isDelivered: false
    },
    {
      id: '2',
      date: new Date(2022, 5 ,28),
      parcels: [ 4, 3 ],
      customer: {
        id: 1,
        name: 'Sally Johnson',
        address: '8, North Road, Village',
        phoneNumber: '+230 5 777 8888'
      },
      isDelivered: false,
      comments: 'Please leave the parcel under the porch'
    }
  ];

  constructor(
    public http: HttpClient
  ) { }

  getDeliveries() {
    return [...this.deliveryList];
  }

  getDelivery(id: string) {
    console.log(id);
    console.log([...this.deliveryList].find(d => d.id === id));
    return [...this.deliveryList].find(d => d.id === id);
  }

  addDelivery(delivery: Delivery) {
    this.setCustomerId(delivery.customer);
    console.log(delivery);
    this.deliveryList = [...this.deliveryList, delivery];
  }

  getAllParcels() {
    return this.http['get'](`${this.baseUrl}parcels`);
  }

  setCustomerId(customer: Customer) {
    customer.id = Math.max(...this.deliveryList.map(d => d.customer.id)) + 1;
  }

  getNewDeliveryId() {
    return (Math.max(...this.deliveryList.map(d => +d.id)) + 1).toString();
  }
}
