import { ClientInner } from '../client.js';
import { PaginatedResponse } from '../models/common.js';
import {
  GetKaminoSwapsRequest,
  GetKaminoTopTradersRequest,
  GetKaminoTopTokensRequest,
  GetKaminoTopFilledTradesRequest,
  KaminoSwap,
  Orderbook,
  ChartPieData,
  KaminoTraderScore,
  KaminoTopToken
} from '../models/kamino.js';

export class KaminoApi {
  constructor(private client: ClientInner) {}

  async getActiveSwaps(request: GetKaminoSwapsRequest = {}): Promise<PaginatedResponse<KaminoSwap>> {
    return this.client.get('/api/kamino/swaps/active', request);
  }

  async getAllSwaps(request: GetKaminoSwapsRequest = {}): Promise<PaginatedResponse<KaminoSwap>> {
    return this.client.get('/api/kamino/swaps', request);
  }

  async getSolUsdcOrderbook(): Promise<Orderbook> {
    return this.client.get('/api/kamino/orderbook/sol-usdc');
  }

  async getSwapVolumeChartData(): Promise<ChartPieData[]> {
    return this.client.get('/api/kamino/chart/pie');
  }

  async getTopFilledTrades(request: GetKaminoTopFilledTradesRequest = {}): Promise<KaminoSwap[]> {
    return this.client.get('/api/kamino/trades/top/filled', request);
  }

  async getTopTraders(request: GetKaminoTopTradersRequest = {}): Promise<KaminoTraderScore[]> {
    return this.client.get('/api/kamino/traders/top', request);
  }

  async getTopTokens(request: GetKaminoTopTokensRequest = {}): Promise<KaminoTopToken[]> {
    return this.client.get('/api/kamino/tokens/top', request);
  }
}
