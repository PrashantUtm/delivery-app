import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { Parcel } from 'src/app/interfaces/parcel';
import { DeliveryService } from 'src/app/services/delivery.service';
import { AddParcelsComponent } from './modals/add-parcels/add-parcels.component';

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.page.html',
  styleUrls: ['./new-delivery.page.scss'],
})
export class NewDeliveryPage implements OnInit {

  public deliveryForm: FormGroup;
  public parcels: Parcel[] = [];

  private parcelsEventEmitter: EventEmitter<number[]> = new EventEmitter();

  constructor(
    private deliveryService: DeliveryService,
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    private nativeGeocoder: NativeGeocoder
  ) { 

  }

  ngOnInit() {
    this.parcels = JSON.parse(localStorage.getItem('parcels'));
    this.deliveryService.getAllParcels().subscribe(result => {
      this.parcels = result as Parcel[];
      var offlineStore = window.localStorage;
      offlineStore.setItem('parcels', JSON.stringify(result));
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

  addDelivery() {
    if(this.deliveryForm.valid) {
      this.deliveryService.addDelivery(this.deliveryForm.value).subscribe(() => {
        this.deliveryForm.reset();
      });
    }
  }

  async openAddParcelsModal() {
    const selectedIds = this.deliveryForm.controls['parcels'].value;
    const modal = await this.modalController.create({
      component: AddParcelsComponent,
      componentProps: {
        parcels: this.parcels,
        selectedIds: selectedIds,
        confirmEvent: this.parcelsEventEmitter
      }
    });
    modal.present();
  }

  setParcels(parcelsIdsSelected: number[]) {
    this.deliveryForm.controls['parcels'].patchValue(parcelsIdsSelected);
  }

  public async setAddressToCurrentLocation(): Promise<void> {

    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      const firstResult = result[0];
      console.log(firstResult);
      this.deliveryForm.patchValue({
        customer: {
          address: `${firstResult.locality} ${firstResult.subLocality} ${firstResult.countryName}, ${firstResult.postalCode}`
        }
      })
    }).catch((error: any) => console.log(error));
  } 
}
