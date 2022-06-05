import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { Delivery } from 'src/app/interfaces/delivery';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss'],
})
export class DeliveryItemComponent implements OnInit {
  @Input() public delivery: Delivery;

  constructor() { }

  ngOnInit() {}

  getInitials(customer: Customer): string {
    return customer.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
  }

}
