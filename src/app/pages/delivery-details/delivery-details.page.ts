import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  public delivery: Delivery;
  @ViewChild('phoneNumberSlidingItem') phoneItemSliding: IonItemSliding;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(paramMap.has('deliveryid')) {
        this.delivery = this.deliveryService.getDelivery(paramMap.get('deliveryid'));
      }
    })
  }

  callCustomer() {
    window.open(`tel:${this.delivery.customer.phoneNumber}`);
  }

  toggleSlidingCall() {
    if(this.phoneItemSliding['el'].classList.contains('item-sliding-active-slide')) {
      this.phoneItemSliding.close();
    } else {
      this.phoneItemSliding.open('end');
    }
  }
}
