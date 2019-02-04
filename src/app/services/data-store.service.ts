import { Injectable } from '@angular/core';
import { openDb } from 'idb';

export interface Player {
  name: string;
}
export type Players = Player[];

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly dbName = 'color-game';
  private readonly players = 'players';

  private async initializeDb() {
    return await openDb(this.dbName, 1, upgradeDb => {
      if (!upgradeDb.objectStoreNames.contains(this.players)) {
        upgradeDb.createObjectStore(this.players, { keyPath: 'name' });
      }
    });
  }

  private async initializeStore() {
    const database = await this.initializeDb();
    return database.transaction(this.players, 'readwrite').objectStore(this.players);
  }

  async getAll(): Promise<Players> {
    const store = await this.initializeStore();
    const result = await store.getAll();
    return result as Players;
  }

  async get(name: string): Promise<Player> {
    const store = await this.initializeStore();
    const result = await store.get(name);
    return result as Player;
  }

  async set(name: string) {
    const store = await this.initializeStore();
    await store.put({ name: name });
  }

  async delete(name: string) {
    const store = await this.initializeStore();
    await store.delete(name);
  }
}