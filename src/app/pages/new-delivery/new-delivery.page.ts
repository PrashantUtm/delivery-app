import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      id:[newId, Validators.required],
      date: ['', Validators.required],
      comments: [''],
      customer: this.formBuilder.group(
        {
          id: [-1, Validators.required],
          name: ['', [Validators.required, Validators.minLength(2)]],
          address: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{8}")]]
        }
      ),
      parcels: ['', Validators.required]
    });
  }

  addDelivery() {
    if(this.deliveryForm.valid) {
      this.deliveryService.addDelivery(this.deliveryForm.value);
      this.deliveryForm.reset();
    }
  }
}
