import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.deliveryForm = this.formBuilder.group({
      id:['-1', Validators.required],
      date:['', Validators.required],
      comments:[''],
      parcels:[[]],
      customer: this.formBuilder.group({
        id:[-1, Validators.required],
        name:['', [Validators.required, Validators.minLength(2)]],
        address:['', Validators.required],
        phoneNumber:['', [Validators.required, Validators.pattern("[0-9 ]{8}")]]
      })
    });
  }

  addDelivery() {
    if(this.deliveryForm.valid) {
      console.log(this.deliveryForm);
      this.deliveryService.addDelivery(this.deliveryForm.value);
      this.deliveryForm.reset();
    } else {
      console.log('Form invalid');
    }
  }

}
