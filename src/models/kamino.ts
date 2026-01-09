import { PaginatedResponse } from './common.js';

export interface GetKaminoSwapsRequest {
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
  trader?: string;
  search?: string;
  start?: number;
  end?: number;
  minAmountUsd?: string;
}

export interface GetKaminoTopTradersRequest {
  limit?: number;
  timeframe?: string;
}

export interface GetKaminoTopTokensRequest {
  limit?: number;
  timeframe?: string;
}

export interface GetKaminoTopFilledTradesRequest {
  limit?: number;
  timeframe?: string;
}

export interface KaminoSwap {
  publicKey?: string;
  maker?: string;
  inputMint?: string;
  outputMint?: string;
  initialInputAmount: number;
  expectedOutputAmount: number;
  remainingInputAmount: number;
  filledOutputAmount: number;
  lastUpdatedTimestamp: number;
  inputTokenSymbol?: string;
  outputTokenSymbol?: string;
  inputTokenName?: string;
  outputTokenName?: string;
  initialInputAmountNotional?: number;
  expectedOutputAmountNotional?: number;
  remainingInputAmountNotional?: number;
  filledOutputAmountNotional?: number;
  amountUsd?: number;
  cancelled: boolean;
  buy: boolean;
}

export interface OrderbookLevel {
  price: number;
  size: number;
}

export interface Orderbook {
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
}

export interface ChartPieData {
  label: string;
  value: number;
}

export interface KaminoTraderScore {
  trader: string;
  count?: number;
  totalVolumeUsd: number;
}

export interface KaminoTopToken {
  mint: string;
  symbol?: string;
  name?: string;
  totalVolumeUsd?: number;
  totalBuyVolumeUsd?: number;
  totalSellVolumeUsd?: number;
}
