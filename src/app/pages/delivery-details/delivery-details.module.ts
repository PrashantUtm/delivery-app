import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryDetailsPageRoutingModule } from './delivery-details-routing.module';

import { DeliveryDetailsPage } from './delivery-details.page';
import { ParcelItemComponent } from 'src/app/components/parcel-item/parcel-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryDetailsPageRoutingModule
  ],
  declarations: [DeliveryDetailsPage, ParcelItemComponent]
})
export class DeliveryDetailsPageModule {}
