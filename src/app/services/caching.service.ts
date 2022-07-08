import { Injectable } from '@angular/core';
import { SetOptions, Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor() { }

  public async get<T>(key: CacheKey): Promise<T> {
    if((await Storage.keys()).keys.includes(key)) {
      const value = (await Storage.get({key: key})).value;
      return JSON.parse(value) as T;
    }
    return null;
  }

  public async set(key: CacheKey, value: object) {
    const jsonValue = JSON.stringify(value);
    await Storage.set({ key: key, value: jsonValue });
  }

  public async remove(key: CacheKey) {
    await Storage.remove({key});
  }
}

export enum CacheKey {
  Parcels = 'parcels',
  Deliveries = 'deliveries',
}
