import { Customer } from "./customer";

export interface Delivery {
    id: string,
    date: Date,
    parcels: number[],
    customer: Customer,
    isDelivered: boolean,
    comments?: string
}
