import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.page.html',
  styleUrls: ['./new-delivery.page.scss'],
})
export class NewDeliveryPage implements OnInit {

  public deliveryForm: FormGroup;

  constructor(
    private deliveryService: DeliveryService,
    public formBuilder: FormBuilder
  ) { 

  }

  ngOnInit() {
    this.deliveryForm = this.formBuilder.group({
      date: [''],
      comments: [''],
      customer: this.formBuilder.group(
        {
          name: [''],
          address: [''],
          phoneNumber: ['']
        }
      )
    });
  }

  addDelivery() {
    console.log(this.deliveryForm.value);

    const delivery: Delivery = {
      id: '-1',
      customer: this.deliveryForm.get('customer').value,
      date: new Date(this.deliveryForm.get('date').value),
      isDelivered: false,
      parcels: []
    } 

    console.log(delivery);
    this.deliveryService.addDelivery(delivery);
  }

}
