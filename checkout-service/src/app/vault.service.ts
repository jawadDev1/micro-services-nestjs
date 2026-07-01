import { Injectable, OnModuleInit } from '@nestjs/common';
import NodeVault from 'node-vault';

@Injectable()
export class VaultService implements OnModuleInit {
  private readonly vault: any;
  private db_secret: string = '';

  constructor() {
    this.vault = NodeVault({
      apiVersion: 'v1',
      endpoint: 'http://localhost:8200',
      token: 'my-super-secret-token',
    });
  }

  async onModuleInit() {
    try {
      const res = await this.vault.read('secret/data/secret/data/config');
      if (res?.data?.data) {
        this.db_secret = res.data.data.DB_SECRET;
        console.log('Secret fetched successfully!!!!!!!!!!!!');
      }
    } catch {
      console.log('Failed to fetch secret');
    }
  }

  getDBUrl(): string {
    return this.db_secret;
  }
}
