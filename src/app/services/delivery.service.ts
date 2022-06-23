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
      parcels: [
        {
          id: 1,
          name: 'Earphones',
          seller: 'Galaxy',
          price: 400.00,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/In-ears-earphones.png'
        },
        {
          id: 2,
          name: 'Mobile Phone',
          seller: 'Winners',
          price: 10400.00,
          imageUrl:'https://diff.wikimedia.org/wp-content/uploads/2016/06/notification-mockup.jpg'
        },
      ],
      customer: {
        id: 1,
        name: 'John Doe',
        address: '7, This Street, City',
        phoneNumber: '+230 5 777 6666'
      },
      comments: 'Deliver after 6 p.m',
      isDelivered: false
    },
    {
      id: '2',
      date: new Date(2022, 5 ,28),
      parcels: [
        {
          id: 4,
          name: 'Television',
          seller: 'Galaxy',
          price: 1400.00,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HD_Television.svg/2048px-HD_Television.svg.png'
        },
        {
          id: 3,
          name: 'Cupboard',
          seller: 'Courts',
          price: 5400.00,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Cupboard_%28Beeldenkast%29_MET_DP105750.jpg'
        },
      ],
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
