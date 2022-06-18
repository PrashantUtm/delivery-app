import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDeliveryPageRoutingModule } from './new-delivery-routing.module';

import { NewDeliveryPage } from './new-delivery.page';
import { ParcelItemComponent } from 'src/app/components/parcel-item/parcel-item.component';
import { AddParcelsComponent } from './modals/add-parcels/add-parcels.component';
import { ShowMapComponent } from './modals/show-map/show-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDeliveryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewDeliveryPage, ParcelItemComponent, AddParcelsComponent, ShowMapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewDeliveryPageModule {}
