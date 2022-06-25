import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { Parcel } from 'src/app/interfaces/parcel';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  public delivery: Delivery;
  public parcels: Parcel[];
  @ViewChild('phoneNumberSlidingItem') itemSliding: IonItemSliding;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(paramMap.has('deliveryid')) {
        this.deliveryService.getDelivery(paramMap.get('deliveryid')).subscribe(result => {
          this.delivery = result as Delivery;
          this.getParcelsForDelivery();
        });
        
      }
    })
  }

  callCustomer() {
    window.open(`tel:${this.delivery.customer.phoneNumber}`);
  }

  toggleSlidingCall() {
    if (this.itemSliding['el'].classList.contains('item-sliding-active-slide'))
      this.itemSliding.close();
    else
      this.itemSliding.open('end');
  }

  getParcelsForDelivery() {
    this.deliveryService.getAllParcels().subscribe(result => {
      const allParcels = result as Parcel[];
      this.parcels = allParcels.filter(p => this.delivery.parcels.includes(p.id));
    });
  }

  markAsDelivered() {
    this.delivery.isDelivered = true;
    this.deliveryService.updateDeliveryStatus(this.delivery).subscribe(res => {
      this.delivery = res as Delivery;
    });
  }
}
