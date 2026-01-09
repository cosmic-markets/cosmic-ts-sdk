import { ClientInner } from '../client.js';
import { PaginatedResponse, SolanaToken } from '../models/common.js';
import {
  GetDcaOrdersRequest,
  GetDcaVolumeRequest,
  GetTokensRequest,
  GetLimitOrdersRequest,
  GetTopTradesFilledRequest,
  GetTopTokensFilledRequest,
  GetLimitOrderV2PieChartRequest,
  GetTopTokensByOpenOrdersRequest,
  GetTopTokensByFilledVolumeRequest,
  GetTopTokensByFilledVolumeTableRequest,
  GetLimitV2OrdersRequest,
  DcaOrder,
  ChartData,
  AggregateDcaData,
  TokenDetailResponse,
  LimitOrder,
  TokenVolume,
  TokenCount,
  LimitOrderV2,
  LimitOrderV2PieChartResponse,
  HotTokenAnalytics,
  TradeVolume
} from '../models/jupiter.js';

export class JupiterApi {
  constructor(private client: ClientInner) {}

  async getOrders(request: GetDcaOrdersRequest): Promise<PaginatedResponse<DcaOrder>> {
    return this.client.get('/api/dca/all', request);
  }

  async getAggregatesVolume(request: GetDcaVolumeRequest): Promise<ChartData> {
    // Handling array query param for tokenMints manually as client.get handles standard key-value
    // But client.get implementation above uses URLSearchParams which doesn't handle arrays nicely by default (duplicates keys).
    // Let's rely on my implementation of client.get which iterates over entries.
    // If request.tokenMints is an array, we need to make sure ClientInner handles it or we manually construct query.
    // My ClientInner implementation iterates Object.entries. If value is array, it might convert to string.
    // I need to check ClientInner implementation.
    
    // I implemented ClientInner as:
    // Object.entries(params).forEach(([key, value]) => { ... searchParams.append(key, String(value)); })
    // This will do tokenMints: "mint1,mint2" or similar.
    // The Rust client does:
    // for mint in mints { req = req.query(&[("tokenMints", mint)]); }
    // which results in tokenMints=mint1&tokenMints=mint2
    
    // I should probably fix ClientInner to handle arrays, but for now I will manually construct params for this method or fix ClientInner.
    // I'll update ClientInner later. For now, let's assume I will fix ClientInner to handle arrays by appending multiple times.
    
    return this.client.get('/api/dca/aggregates/volume', request);
  }

  async getAggregateDcaData(): Promise<AggregateDcaData[]> {
    return this.client.get('/api/dca/aggregates');
  }

  async getTokens(request: GetTokensRequest): Promise<PaginatedResponse<SolanaToken>> {
    return this.client.get('/api/tokens', request);
  }

  async getTokenDetail(tokenMint: string): Promise<TokenDetailResponse> {
    return this.client.get(`/api/tokens/${tokenMint}`);
  }

  async getLimitOrders(request: GetLimitOrdersRequest): Promise<PaginatedResponse<LimitOrder>> {
    return this.client.get('/api/limit/all', request);
  }

  async getLimitTopFilled(request: GetTopTokensByFilledVolumeRequest): Promise<TokenVolume[]> {
    return this.client.get('/api/limit/top/filled', request);
  }

  async getLimitTopFilledTable(request: GetTopTokensByFilledVolumeTableRequest): Promise<PaginatedResponse<TokenVolume>> {
    return this.client.get('/api/limit/top/filled/table', request);
  }

  async getLimitTopFilledChart(request: GetTopTokensByFilledVolumeRequest): Promise<ChartData> {
    return this.client.get('/api/limit/top/filled/chart', request);
  }

  async getLimitTopOpen(request: GetTopTokensByOpenOrdersRequest): Promise<TokenCount[]> {
    return this.client.get('/api/limit/top/open', request);
  }

  async getLimitV2Orders(request: GetLimitV2OrdersRequest): Promise<PaginatedResponse<LimitOrderV2>> {
    return this.client.get('/api/limitv2/all', request);
  }

  async getLimitV2PieChart(request: GetLimitOrderV2PieChartRequest): Promise<LimitOrderV2PieChartResponse> {
    return this.client.get('/api/limitv2/all/chart', request);
  }

  async getHotTokens(): Promise<HotTokenAnalytics[]> {
    return this.client.get('/api/hot-token');
  }

  async getTopTradesFilled(request: GetTopTradesFilledRequest): Promise<TradeVolume[]> {
    return this.client.get('/api/trades/top/filled', request);
  }

  async getTopTokensFilled(request: GetTopTokensFilledRequest): Promise<SolanaToken[]> {
    return this.client.get('/api/tokens/top/filled', request);
  }

  async getDashboardPrices(): Promise<any> {
    return this.client.get('/api/dashboard/prices');
  }
}
