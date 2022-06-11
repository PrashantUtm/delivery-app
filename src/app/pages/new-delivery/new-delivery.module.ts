import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDeliveryPageRoutingModule } from './new-delivery-routing.module';

import { NewDeliveryPage } from './new-delivery.page';
import { ParcelItemComponent } from 'src/app/components/parcel-item/parcel-item.component';
import { AddParcelsComponent } from './modals/add-parcels/add-parcels.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDeliveryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewDeliveryPage, ParcelItemComponent, AddParcelsComponent]
})
export class NewDeliveryPageModule {}
