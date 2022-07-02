import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
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
    public modalController: ModalController,
    private nativeGeocoder: NativeGeocoder
  ) { 

  }

  ngOnInit() {

    this.parcels = JSON.parse(localStorage.getItem('parcels'));
    this.deliveryService.getAllParcels().subscribe(result => {
      this.parcels = result as Parcel[];
      var offlineStore = window.localStorage;
      offlineStore.setItem('parcels', JSON.stringify(this.parcels));
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
    this.selectedParcelIds = this.deliveryForm.controls['parcels'].value;
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

  async setAddressToCurrentLocation() {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    const coordinates = await Geolocation.getCurrentPosition();
    this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        const firstResult = result[0];
        console.log(firstResult);
        this.deliveryForm.patchValue({
          customer:{
            address: `${firstResult.locality} ${firstResult.subLocality} ${firstResult.countryName}, ${firstResult.postalCode}`
          }
        });
      })
      .catch((error: any) => console.log(error));
  }

  addDelivery() {
    if(this.deliveryForm.valid) {
      this.deliveryService.addDelivery(this.deliveryForm.value).subscribe(res => {
        this.deliveryForm.reset();
      });
    }
  }

  setParcels(parcelsSelected: number[]) {
    this.deliveryForm.controls['parcels'].patchValue(parcelsSelected);
  }
}
