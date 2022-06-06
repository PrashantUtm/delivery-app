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
    const newId = this.deliveryService.getNewDeliveryId();

    this.deliveryForm = this.formBuilder.group({
      id:[newId],
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
    this.deliveryService.addDelivery(this.deliveryForm.value);
    this.deliveryForm.reset();
  }
}
