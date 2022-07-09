import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { filter } from 'rxjs/operators';
import { CacheKey, CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})
export class DeliveryListPage implements OnInit {

  public deliveryList: Delivery[];
  public showFilteredList = true;

  constructor(
    private cachingService: CachingService,
    private deliveryService: DeliveryService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(async () => {
      await this.getDeliveries();
    });
  }

  public async getDeliveries() {

    const deliveries = await this.cachingService.get<Delivery[]>(CacheKey.Deliveries);
    if(deliveries) {
      this.deliveryList = this.showFilteredList ? deliveries.filter(d => !d.isDelivered) : deliveries;
    }

    this.deliveryService.getDeliveries().subscribe(result => {
      const allDeliveries = result as Delivery[];
      this.cachingService.set(CacheKey.Deliveries, allDeliveries);
      this.deliveryList = this.showFilteredList ? allDeliveries.filter(d => !d.isDelivered) : allDeliveries;
    });
  }
}
