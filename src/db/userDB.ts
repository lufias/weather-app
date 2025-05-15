import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { UserProfile } from '../store/modules/user';

export interface StoredUserProfile extends UserProfile {
  id?: number;
}

export class UserDB extends Dexie {
  profile!: Table<StoredUserProfile, number>;

  constructor() {
    super('UserDB');
    this.version(1).stores({
      profile: '++id,name,email,phone,avatar'
    });
  }
}

export const userDB = new UserDB(); 