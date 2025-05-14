import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface StoredLocation {
  id?: number;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export class LocationDB extends Dexie {
  locations!: Table<StoredLocation, number>;

  constructor() {
    super('LocationDB');
    this.version(1).stores({
      locations: '++id,city,state,country,lat,lon'
    });
  }
}

export const db = new LocationDB(); 