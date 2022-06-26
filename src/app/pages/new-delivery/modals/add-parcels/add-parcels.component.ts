import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Parcel } from 'src/app/interfaces/parcel';

@Component({
  selector: 'app-add-parcels',
  templateUrl: './add-parcels.component.html',
  styleUrls: ['./add-parcels.component.scss'],
})
export class AddParcelsComponent implements OnInit {

  @Input() parcels: Parcel[];
  @Input() selectedIds: number[];
  @Output() confirmEvent = new EventEmitter<number[]>();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if(this.parcels) {
      this.parcels = this.parcels.map(parcel => ({ ...parcel, checked: this.selectedIds?.includes(parcel.id) }))
    }

  }

  confirm() {
    const ids = this.parcels.filter(p => p['checked']).map(p => p.id);
    this.confirmEvent.emit(ids);
    this.modalController.dismiss();
  }
}
