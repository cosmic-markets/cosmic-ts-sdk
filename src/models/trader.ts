import { DcaOrder, LimitOrder, LimitOrderV2 } from './jupiter.js';
import { DriftFilledTrade } from './drift.js';
import { KaminoSwap } from './kamino.js';

export interface TraderProfile {
  authority: string;
  recentDriftTrades?: DriftFilledTrade[];
  recentDcaOrders?: DcaOrder[];
  recentLimitOrders?: LimitOrder[];
  recentLimitOrdersV2?: LimitOrderV2[];
  recentKaminoSwaps?: KaminoSwap[];
}

export interface GetTraderProfileRequest {
  // Empty for now
}
