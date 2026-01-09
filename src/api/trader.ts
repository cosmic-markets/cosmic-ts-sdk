import { ClientInner } from '../client.js';
import { TraderProfile, GetTraderProfileRequest } from '../models/trader.js';

export class TraderApi {
  constructor(private client: ClientInner) {}

  async getTraderProfile(
    authority: string,
    request: GetTraderProfileRequest = {}
  ): Promise<TraderProfile> {
    return this.client.get(`/api/trader/${authority}`);
  }
}
