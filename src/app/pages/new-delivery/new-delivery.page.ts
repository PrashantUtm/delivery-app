import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Parcel } from 'src/app/interfaces/parcel';
import { DeliveryService } from 'src/app/services/delivery.service';
import { AddParcelsComponent } from './modals/add-parcels/add-parcels.component';
import { ShowMapComponent } from './modals/show-map/show-map.component';

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.page.html',
  styleUrls: ['./new-delivery.page.scss'],
})
export class NewDeliveryPage implements OnInit {

  public deliveryForm: FormGroup;
  public parcels: Parcel[] = [];
  public selectedParcelIds: number[] = [];

  private parcelsEventEmitter: EventEmitter<number[]> = new EventEmitter();

  constructor(
    private deliveryService: DeliveryService,
    public formBuilder: FormBuilder,
    public modalController: ModalController
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

    this.parcelsEventEmitter.subscribe(ids => this.setParcels(ids));
  }

  async presentNewParcelsModal() {
    const modal = await this.modalController.create({
      component: AddParcelsComponent,
      componentProps: {
        parcels: this.parcels,
        selectedParcelIds: this.selectedParcelIds,
        dismissedEvent: this.parcelsEventEmitter
      }
    });
    return await modal.present();
  }

  async presentPickLocationModal() {
    const modal = await this.modalController.create({
      component: ShowMapComponent
    });
    return await modal.present();
  }

  addDelivery() {
    if(this.deliveryForm.valid) {
      this.deliveryService.addDelivery(this.deliveryForm.value);
      this.deliveryForm.reset();
    }
  }

  setParcels(parcelsSelected: number[]) {
    this.selectedParcelIds = parcelsSelected;
    this.deliveryForm.controls['parcels'].patchValue(this.parcels.filter(p => parcelsSelected.includes(p.id)));
  }
}
