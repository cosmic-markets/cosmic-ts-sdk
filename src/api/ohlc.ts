import { ClientInner } from '../client.js';
import { OhlcvData, RecentOhlcResponse, GetOhlcRequest } from '../models/ohlc.js';

export class OhlcApi {
  constructor(private client: ClientInner) {}

  async getLatestOhlc(
    mint: string,
    interval: string,
    request: GetOhlcRequest = {}
  ): Promise<OhlcvData[]> {
    return this.client.get(`/api/ohlc/tokens/${mint}/${interval}/latest`, request);
  }

  async getRecentOhlc(): Promise<RecentOhlcResponse> {
    return this.client.get('/api/ohlc/recent');
  }
}
