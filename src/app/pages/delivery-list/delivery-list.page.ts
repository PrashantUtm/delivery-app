import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})
export class DeliveryListPage implements OnInit {

  public deliveryList: Delivery[];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.deliveryList = this.deliveryService.getDeliveries();
  }

  getInitials(customer: Customer): string {
    return customer.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
  }

}
