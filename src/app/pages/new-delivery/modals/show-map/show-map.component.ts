import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular'; 
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.scss'],
})
export class ShowMapComponent implements OnInit {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;;
  newMap: GoogleMap;

  constructor(public modalController: ModalController) {
   }

  ngOnInit() {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'pick-location-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: -20.177719706304153,
          lng: 57.46689840168132,
        },
        zoom: 10,
      },
    });
  }
  
 
  async showCurrentPosition() {
    // todo
  }
 
  ionViewDidLeave() {
    this.newMap.destroy();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
