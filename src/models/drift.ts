import { PaginatedResponse } from './common.js';

export interface DriftMarketSummary {
  publicKey?: string;
  marketIndex: number;
  name?: string;
  baseAssetSymbol?: string;
  lastOraclePrice?: number;
  lastOracleConf?: number;
  lastFundingRate?: number;
  lastFundingRateTs?: number;
  baseAssetAmountLong?: number;
  baseAssetAmountShort?: number;
  totalFee?: number;
  status?: number;
  marginRatioInitial?: number;
  marginRatioMaintenance?: number;
  minimumQuoteAssetTradeSize?: number;
  marginRatioInitialDecimal?: number;
  marginRatioMaintenanceDecimal?: number;
  imfFactorDecimal?: number;
  liquidatorFeeDecimal?: number;
  ifLiquidationFeeDecimal?: number;
  createdAt?: number;
  recentVolume?: number;
  recentTradeCount?: number;
  volumeTimeRangeMinutes?: number;
  openInterest?: number;
  longShortRatio?: number;
  priceChange24Hour?: number;
}

export interface DriftMarketDetail {
  publicKey?: string;
  marketIndex: number;
  name?: string;
  baseAssetSymbol?: string;
  lastOraclePrice?: number;
  // ... other fields matching summary/response
}

export interface DriftMarketStats {
  totalVolume?: number;
  openInterest?: number;
  activeTraders?: number;
}

export interface DriftPositionSummary {
  marketIndex: number;
  baseAssetAmount?: number;
  quoteAssetAmount?: number;
  quoteEntryAmount?: number;
  settledPnl?: number;
  authority?: string;
  createdAt?: number;
  positionSide?: string;
  positionSize?: number;
  unrealizedPnl?: number;
  marketName?: string;
  baseAssetSymbol?: string;
  lastOraclePrice?: number;
  lastNotionalAmount?: number;
}

export interface DriftSpotPositionSummary {
  marketIndex: number;
  balance?: number;
  authority?: string;
}

export interface DriftUserPositions {
  perpPositions: DriftPositionSummary[];
  spotPositions: DriftSpotPositionSummary[];
  authority?: string;
}

export interface DriftPerpPositionHistory {
  time?: number;
  userPublicKey?: string;
  authority?: string;
  marketIndex?: number;
  baseAssetAmount?: number;
  quoteAssetAmount?: number;
  quoteEntryAmount?: number;
  settledPnl?: number;
  sizeNotional?: number;
  positionSide?: string;
  positionSize?: number;
}

export interface DriftOrderSummary {
  publicKey?: string;
  userPublicKey?: string;
  orderId: number;
  marketIndex: number;
  price?: number;
  baseAssetAmount?: number;
  baseAssetAmountFilled?: number;
  quoteAssetAmountFilled?: number;
  triggerPrice?: number;
  status?: string;
  orderType?: string;
  marketType?: number;
  direction?: number;
  reduceOnly: boolean;
  postOnly: boolean;
  accountName?: string;
  authority?: string;
  createdAt?: number;
  oraclePrice?: number;
  oraclePriceOffset?: number;
  fillPercentage?: number;
  marketName?: string;
  baseAssetSymbol?: string;
  tags: string[];
}

export interface DriftAccountDetail {
  authority?: string;
  userPublicKey?: string;
}

export interface DriftAccountSummary {
  authority?: string;
  userPublicKey?: string;
  totalVolume?: number;
  tradeCount?: number;
}

export interface DriftVolumeResponse {
  totalVolume?: number;
  totalTrades: number;
  marketsWithVolume: number;
  uniqueTraders: number;
  timeRangeMinutes: number;
  timestamp: number;
}

export interface DriftMarketVolumeResponse {
  marketVolume?: number;
}

export interface DriftFilledTrade {
  publicKey?: string;
  userPublicKey?: string;
  orderId: number;
  slot: number;
  marketIndex: number;
  price?: number;
  baseAssetAmount?: number;
  baseAssetAmountFilled?: number;
  quoteAssetAmountFilled?: number;
  direction: number;
  orderType: number;
  marketName?: string;
  baseAssetSymbol?: string;
  authority?: string;
  createdAt?: number;
  fillPercentage?: number;
}

export interface OrderbookEntry {
  price: number;
  size: number;
}

export interface OrderbookResponse {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
}

export interface DriftMarketAnalytics {
  marketIndex: number;
  volume?: number;
  openInterest?: number;
}

// Request Interfaces
export interface GetDriftMarketsRequest {
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
  status?: string;
  search?: string;
  minutes?: number;
}

export interface GetDriftMarketStatsRequest {
  minutes?: number;
}

export interface GetDriftMarketPerpPositionsRequest {
  page?: number;
  size?: number;
  minSize?: number;
  side?: string;
  sortField?: string;
  sortOrder?: string;
}

export interface GetDriftMarketSpotPositionsRequest {
  page?: number;
  size?: number;
  minBalance?: number;
}

export interface GetDriftPerpPositionHistoryRequest {
  startTime?: number;
  endTime?: number;
}

export interface GetDriftPerpPositionHistoryRecentRequest {
  days?: number;
}

export interface GetLatestDriftPerpHistoricalPositionsRequest {
  limit?: number;
  minSizeNotional?: number;
}

export interface GetDriftMarketOrdersRequest {
  page?: number;
  size?: number;
  status?: string;
  orderType?: string;
  minAmountUsd?: number;
  sortField?: string;
  sortOrder?: string;
  showMaker?: boolean;
  marketSymbol?: string;
  trader?: string;
}

export interface GetDriftUserOrdersRequest {
  page?: number;
  size?: number;
  status?: string;
}

export interface GetDriftActiveAccountsRequest {
  page?: number;
  size?: number;
  minutes?: number;
}

export interface GetDriftVolumeRequest {
  minutes?: number;
}

export interface GetDriftFilledTradesRequest {
  page?: number;
  size?: number;
  minutes?: number;
  sortField?: string;
  sortOrder?: string;
}

export interface GetDriftOrderbookRequest {
  percentile?: number;
}

export interface GetDriftMarketAnalyticsRequest {
  minutes?: number;
}
