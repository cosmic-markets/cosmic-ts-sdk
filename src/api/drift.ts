import { ClientInner } from '../client.js';
import { PaginatedResponse } from '../models/common.js';
import {
  DriftMarketSummary,
  DriftMarketDetail,
  DriftMarketStats,
  DriftPositionSummary,
  DriftSpotPositionSummary,
  DriftUserPositions,
  DriftPerpPositionHistory,
  DriftOrderSummary,
  DriftAccountDetail,
  DriftAccountSummary,
  DriftVolumeResponse,
  DriftMarketVolumeResponse,
  DriftFilledTrade,
  OrderbookResponse,
  DriftMarketAnalytics,
  GetDriftMarketsRequest,
  GetDriftMarketStatsRequest,
  GetDriftMarketPerpPositionsRequest,
  GetDriftMarketSpotPositionsRequest,
  GetDriftPerpPositionHistoryRequest,
  GetDriftPerpPositionHistoryRecentRequest,
  GetLatestDriftPerpHistoricalPositionsRequest,
  GetDriftMarketOrdersRequest,
  GetDriftUserOrdersRequest,
  GetDriftActiveAccountsRequest,
  GetDriftVolumeRequest,
  GetDriftFilledTradesRequest,
  GetDriftOrderbookRequest,
  GetDriftMarketAnalyticsRequest
} from '../models/drift.js';

export class DriftApi {
  constructor(private client: ClientInner) {}

  async getAllMarkets(request: GetDriftMarketsRequest = {}): Promise<PaginatedResponse<DriftMarketSummary>> {
    return this.client.get('/api/drift/markets', request);
  }

  async getMarketDetails(marketPubkey: string): Promise<DriftMarketDetail> {
    return this.client.get(`/api/drift/markets/${marketPubkey}`);
  }

  async getMarketStats(request: GetDriftMarketStatsRequest = {}): Promise<DriftMarketStats> {
    return this.client.get('/api/drift/markets/stats', request);
  }

  async getMarketPerpPositions(
    marketPubkey: string,
    request: GetDriftMarketPerpPositionsRequest = {}
  ): Promise<PaginatedResponse<DriftPositionSummary>> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/positions/perp`, request);
  }

  async getMarketSpotPositions(
    marketPubkey: string,
    request: GetDriftMarketSpotPositionsRequest = {}
  ): Promise<PaginatedResponse<DriftSpotPositionSummary>> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/positions/spot`, request);
  }

  async getUserPositions(authority: string): Promise<DriftUserPositions> {
    return this.client.get(`/api/drift/users/${authority}/positions`);
  }

  async getUserPerpPositions(authority: string): Promise<DriftPositionSummary[]> {
    return this.client.get(`/api/drift/users/${authority}/positions/perp`);
  }

  async getTopActiveDriftPositions(limit: number): Promise<DriftPositionSummary[]> {
    return this.client.get(`/api/drift/positions/top/${limit}`);
  }

  async getPerpPositionHistory(
    authority: string,
    marketPubkey: string,
    request: GetDriftPerpPositionHistoryRequest = {}
  ): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(
      `/api/drift/users/${authority}/positions/${marketPubkey}/history`,
      request
    );
  }

  async getPerpPositionHistoryAllTime(
    authority: string,
    marketPubkey: string
  ): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(
      `/api/drift/users/${authority}/positions/${marketPubkey}/history/all`
    );
  }

  async getPerpPositionHistoryRecent(
    authority: string,
    marketPubkey: string,
    request: GetDriftPerpPositionHistoryRecentRequest = {}
  ): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(
      `/api/drift/users/${authority}/positions/${marketPubkey}/history/recent`,
      request
    );
  }

  async getPerpPositionHistoryByMarketPubkey(
    authority: string,
    marketPubkey: string,
    request: GetDriftPerpPositionHistoryRequest = {}
  ): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(
      `/api/drift/users/${authority}/markets/${marketPubkey}/positions/history`,
      request
    );
  }

  async getTopPositionsByNotionalSize(limit: number): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(`/api/drift/positions/history/top/${limit}`);
  }

  async getTopPositionsByNotionalSizeForMarket(
    marketPubkey: string,
    limit: number
  ): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/positions/history/top/${limit}`);
  }

  async getPositionsByNotionalSizeThreshold(threshold: number): Promise<DriftPerpPositionHistory[]> {
    return this.client.get(`/api/drift/positions/history/size/${threshold}`);
  }

  async getLatestDriftPerpHistoricalPositions(
    request: GetLatestDriftPerpHistoricalPositionsRequest = {}
  ): Promise<DriftPerpPositionHistory[]> {
    return this.client.get('/api/drift/positions/history/latest', request);
  }

  async getMarketOrders(
    marketPubkey: string,
    request: GetDriftMarketOrdersRequest = {}
  ): Promise<PaginatedResponse<DriftOrderSummary>> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/orders`, request);
  }

  async getUserOrders(
    authority: string,
    request: GetDriftUserOrdersRequest = {}
  ): Promise<PaginatedResponse<DriftOrderSummary>> {
    return this.client.get(`/api/drift/users/${authority}/orders`, request);
  }

  async getAccountDetails(authority: string): Promise<DriftAccountDetail[]> {
    return this.client.get(`/api/drift/accounts/${authority}`);
  }

  async getActiveAccounts(
    request: GetDriftActiveAccountsRequest = {}
  ): Promise<PaginatedResponse<DriftAccountSummary>> {
    return this.client.get('/api/drift/accounts/active', request);
  }

  async getTotalVolume(request: GetDriftVolumeRequest = {}): Promise<DriftVolumeResponse> {
    return this.client.get('/api/drift/volume/total', request);
  }

  async getMarketVolume(
    marketPubkey: string,
    request: GetDriftVolumeRequest = {}
  ): Promise<DriftMarketVolumeResponse> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/volume`, request);
  }

  async getFilledTrades(
    request: GetDriftFilledTradesRequest = {}
  ): Promise<PaginatedResponse<DriftFilledTrade>> {
    return this.client.get('/api/drift/trades/filled', request);
  }

  async getMarketFilledTrades(
    marketPubkey: string,
    request: GetDriftFilledTradesRequest = {}
  ): Promise<PaginatedResponse<DriftFilledTrade>> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/trades/filled`, request);
  }

  async getMarketOrderbook(
    marketPubkey: string,
    request: GetDriftOrderbookRequest = {}
  ): Promise<OrderbookResponse> {
    return this.client.get(`/api/drift/markets/${marketPubkey}/orderbook`, request);
  }

  async getMarketAnalytics(
    request: GetDriftMarketAnalyticsRequest = {}
  ): Promise<DriftMarketAnalytics[]> {
    return this.client.get('/api/drift/analytics/markets', request);
  }
}
