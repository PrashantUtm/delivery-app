import { Component, Input, OnInit } from '@angular/core';
import { Parcel } from 'src/app/interfaces/parcel';

@Component({
  selector: 'app-parcel-item',
  templateUrl: './parcel-item.component.html',
  styleUrls: ['./parcel-item.component.scss'],
})
export class ParcelItemComponent implements OnInit {
  @Input() parcel: Parcel;

  constructor() { }

  ngOnInit() {}

}
