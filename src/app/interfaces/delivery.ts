import { Customer } from "./customer";
import { Parcel } from "./parcel";

export interface Delivery {
    id: string,
    date: Date,
    parcels: number[],
    customer: Customer,
    isDelivered: boolean,
    comments?: string
}
