import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Delivery } from 'src/app/interfaces/delivery';
import { Parcel } from 'src/app/interfaces/parcel';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.page.html',
  styleUrls: ['./new-delivery.page.scss'],
})
export class NewDeliveryPage implements OnInit {

  public deliveryForm: FormGroup;
  public parcels: Parcel[] = [];

  constructor(
    private deliveryService: DeliveryService,
    public formBuilder: FormBuilder
  ) { 

  }

  ngOnInit() {
    this.deliveryService.getAllParcels().subscribe(result => {
      this.parcels = result as Parcel[];
    });

    this.deliveryForm = this.formBuilder.group({
      id:['-1'],
      date: [''],
      comments: [''],
      customer: this.formBuilder.group(
        {
          id: [-1],
          name: [''],
          address: [''],
          phoneNumber: ['']
        }
      ),
      parcels: ['']
    });
  }

  addDelivery() {
    const delivery: Delivery = {
      id: this.deliveryForm.get('id').value,
      customer: this.deliveryForm.get('customer').value,
      date: new Date(this.deliveryForm.get('date').value),
      isDelivered: false,
      parcels: this.deliveryForm.get('parcels').value
    } 

    this.deliveryService.addDelivery(delivery);
    this.deliveryForm.reset();
  }
}
