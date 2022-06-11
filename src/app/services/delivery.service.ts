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
          price: 400.00,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/In-ears-earphones.png'
        },
        {
          id: 2,
          name: 'Mobile Phone',
          seller: 'Winners',
          price: 10400.00,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Galaxy_Z_Flip.png/800px-Galaxy_Z_Flip.png'
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
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Oxygen480-devices-video-television_%28modified_and_cropped%29.svg/1200px-Oxygen480-devices-video-television_%28modified_and_cropped%29.svg.png'
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

  addDelivery(delivery: Delivery) {
    this.deliveryList = [...this.deliveryList, delivery];
  }
}
