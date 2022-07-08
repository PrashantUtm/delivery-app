import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonImg, IonItemSliding } from '@ionic/angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { Parcel } from 'src/app/interfaces/parcel';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CacheKey, CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  public delivery: Delivery;
  public parcels: Parcel[];
  @ViewChild('phoneNumberSlidingItem') itemSliding: IonItemSliding;
  @ViewChild('deliveryImage') deliveryImage: IonImg;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cachingService: CachingService,
    private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      if(paramMap.has('deliveryid')) {
        var deliveries = await this.cachingService.get<Delivery[]>(CacheKey.Deliveries);
        if(deliveries) {
          this.delivery = deliveries.find(d => d.id === paramMap.get('deliveryid'));
          this.getParcelsForDelivery();
        }
        this.deliveryService.getDelivery(paramMap.get('deliveryid')).subscribe(result => {
          this.delivery = result as Delivery;
          this.getParcelsForDelivery();
        });
        
      }
    })
  }

  callCustomer() {
    window.open(`tel:${this.delivery.customer.phoneNumber}`);
  }

  toggleSlidingCall() {
    if (this.itemSliding['el'].classList.contains('item-sliding-active-slide'))
      this.itemSliding.close();
    else
      this.itemSliding.open('end');
  }

  getParcelsForDelivery() {
    this.deliveryService.getAllParcels().subscribe(result => {
      const allParcels = result as Parcel[];
      this.parcels = allParcels.filter(p => this.delivery.parcels.includes(p.id));
    });
  }

  markAsDelivered() {
    this.delivery.isDelivered = true;
    this.deliveryService.updateDeliveryStatus(this.delivery).subscribe(res => {
      this.delivery = res as Delivery;
    });
  }

   async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.deliveryImage.src = imageUrl;
  };
}
