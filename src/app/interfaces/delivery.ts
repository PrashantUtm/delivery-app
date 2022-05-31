import { Customer } from "./customer";
import { Parcel } from "./parcel";

export interface Delivery {
    id: string,
    date: Date,
    parcels: Parcel[],
    customer: Customer,
    isDelivered: boolean,
    comments?: string
}
