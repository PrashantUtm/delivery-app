import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Parcel } from 'src/app/interfaces/parcel';

@Component({
  selector: 'app-add-parcels',
  templateUrl: './add-parcels.component.html',
  styleUrls: ['./add-parcels.component.scss'],
})
export class AddParcelsComponent implements OnInit {
  @Input() public parcels: Parcel[];
  @Input() public selectedParcelIds: number[] = [];
  @Output() dismissedEvent = new EventEmitter<number[]>();

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if(this.parcels)
    {
      this.parcels = this.parcels.map(p => ({ ...p, checked: this.selectedParcelIds.includes(p.id) }));
    }
  }

  dismiss() {
    const ids = this.parcels.filter(p => p['checked']).map(p => p.id);
    this.dismissedEvent.emit(ids);
    this.modalController.dismiss();
  }
}
