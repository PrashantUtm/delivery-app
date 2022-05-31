import { Injectable } from '@angular/core';
import { Delivery } from '../interfaces/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private deliveryList: Delivery[] = [
    {
      id: '1',
      date: new Date(2022, 5 ,28),
      parcels: [
        {
          id: 1,
          name: 'Earphones',
          seller: 'Galaxy',
          price: 400.00
        },
        {
          id: 2,
          name: 'Mobile Phone',
          seller: 'Winners',
          price: 10400.00
        },
      ],
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
      parcels: [
        {
          id: 4,
          name: 'Television',
          seller: 'Galaxy',
          price: 1400.00
        },
        {
          id: 3,
          name: 'Cupboard',
          seller: 'Courts',
          price: 5400.00
        },
      ],
      customer: {
        id: 1,
        name: 'Sally Johnson',
        address: '8, North Road, Village',
        phoneNumber: '+230 5 777 8888'
      },
      isDelivered: false
    }
  ];

  constructor() { }

  getDeliveries() {
    return [...this.deliveryList];
  }

  getDelivery(id: string) {
    return [...this.deliveryList].find(d => d.id === id);
  }
}
