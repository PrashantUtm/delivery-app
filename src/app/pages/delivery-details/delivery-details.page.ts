import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  public delivery: Delivery;

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

}
