import { PaginatedResponse, SolanaToken } from './common.js';

// Request Interfaces
export interface GetDcaOrdersRequest {
  filter?: string;
  search?: string;
  tokenMint?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
  minAmountUsd?: number;
  start?: number;
  end?: number;
}

export interface GetDcaVolumeRequest {
  interval: string;
  intervalDuration?: number;
  start: number;
  end: number;
  tokenMints?: string[];
  view?: string;
}

export interface GetTokensRequest {
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
  search?: string;
}

export interface GetLimitOrdersRequest {
  filter?: string;
  search?: string;
  tokenMint?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
  minAmountUsd?: string;
  start?: number;
  end?: number;
}

export interface GetTopTradesFilledRequest {
  limit?: number;
  hours?: number;
}

export interface GetTopTokensFilledRequest {
  limit?: number;
  hours?: number;
}

export interface GetLimitOrderV2PieChartRequest {
  days?: number;
  showMajors?: boolean;
}

export interface GetTopTokensByOpenOrdersRequest {
  hours?: number;
  side?: string;
}

export interface GetTopTokensByFilledVolumeRequest {
  hours?: number;
  side?: string;
  limit?: number;
}

export interface GetTopTokensByFilledVolumeTableRequest {
  hours?: number;
  side?: string;
  limit?: number;
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
}

export interface GetLimitV2OrdersRequest {
  inputMint?: string;
  outputMint?: string;
  trader?: string;
  startDate?: number;
  endDate?: number;
  minAmountUsd?: number;
  tokenSymbol?: string;
  sortField?: string;
  sortOrder?: string;
  page?: number;
  size?: number;
}

// Model Interfaces

export interface DcaOrder {
  publicKey: string;
  userPublicKey: string;
  inputMint: string;
  outputMint: string;
  amount?: number;
  sellAmount?: number;
  scheduledTime?: number;
  amountUsd?: number;
  sellAmountUsd?: number;
  inputTokenSymbol?: string;
  inputTokenName?: string;
  inputTokenImage?: string;
  outputTokenSymbol?: string;
  outputTokenName?: string;
  outputTokenImage?: string;
  inputMintPrice?: number;
  outputMintPrice?: number;
  idx: number;
  nextCycleAt: number;
  inDeposited: number;
  inWithdrawn: number;
  outWithdrawn: number;
  inUsed: number;
  outReceived: number;
  inAmountPerCycle: number;
  cycleFrequency: number;
  nextCycleAmountLeft: number;
  inAccount: string;
  outAccount: string;
  minOutAmount: number;
  maxOutAmount: number;
  keeperInBalanceBeforeBorrow: number;
  dcaOutBalanceBeforeSwap: number;
  createdAt: number;
  bump: number;
  usdSpentPerMinute?: number;
  cancelled: boolean;
  progress?: number;
  buy: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
}

export interface LimitOrder {
  publicKey: string;
  maker: string;
  inputMint: string;
  outputMint: string;
  uniqueId?: string;
  oriMakingAmount?: number;
  oriTakingAmount?: number;
  makingAmount?: number;
  takingAmount?: number;
  borrowMakingAmount?: number;
  expiredAt?: number;
  createdAt: number;
  updatedAt: number;
  bump: number;
  cancelled: boolean;
  inputDecimals: number;
  outputDecimals: number;
  inputTokenSymbol?: string;
  inputTokenName?: string;
  inputTokenImage?: string;
  outputTokenSymbol?: string;
  outputTokenName?: string;
  outputTokenImage?: string;
  inputMintPrice?: number;
  outputMintPrice?: number;
  amount?: number;
  amountUsd?: number;
  progress?: number;
  buy: boolean;
}

export interface LimitOrderV2 {
  tradeHash?: string;
  createdAt?: number;
  trader: string;
  inputMint: string;
  outputMint: string;
  inputAmount: number; // TS doesn't have i64, use number (safe for 53-bit integers) or string/BigInt if needed. Rust SDK uses f64/i64 in models. Usually API JSON returns numbers. 
                       // If API returns large ints as strings, we should type as string. But based on typical JSON apis, I'll stick to number for now, or assume it fits in number.
                       // Rust 'i64' maps to number in JS unless it overflows.
  outputAmount: number;
  inputDecimals: number;
  outputDecimals: number;
  inputTokenSymbol?: string;
  inputTokenName?: string;
  inputTokenImage?: string;
  outputTokenSymbol?: string;
  outputTokenName?: string;
  outputTokenImage?: string;
  inputPrice?: number;
  outputPrice?: number;
  inputPriceTime?: number;
  outputPriceTime?: number;
  inputAmountNormalized?: number;
  outputAmountNormalized?: number;
  inputAmountUsd?: number;
  outputAmountUsd?: number;
  amountUsdNormalized?: number;
  buy: boolean;
}

export interface TokenDetailResponse {
  token: SolanaToken;
}

export interface HotTokenAnalytics {
  tokenMint: string;
  symbol?: string;
  name?: string;
  logoUrl?: string;
  currentPrice?: number;
  priceChange24h?: number;
}

export interface AggregateDcaData {
  token?: string;
  tokenSymbol?: string;
  tokenMint?: string;
  tokenImage?: string;
  buysUsd?: number;
  sellsUsd?: number;
  totalUsd?: number;
  priceUsd?: number;
}

export interface TradeVolume {
  tradeType?: string;
  publicKey?: string;
  maker?: string;
  inputMint?: string;
  outputMint?: string;
  inputTokenSymbol?: string;
  outputTokenSymbol?: string;
  filledAmountUsd?: number;
  timestamp?: number;
  buy: boolean;
}

export interface TokenCount {
  mint: string;
  symbol?: string;
  image?: string;
  count: number;
}

export interface TokenVolume {
  mint: string;
  name?: string;
  symbol?: string;
  image?: string;
  totalVolume?: number;
  buyVolume?: number;
  sellVolume?: number;
  totalFilledUsd?: number;
  buyVolumeUsd?: number;
  sellVolumeUsd?: number;
  volume?: number;
}

export interface ChartPieTokenData {
  token?: string;
  volume?: number;
  buyVolume?: number;
  sellVolume?: number;
  tokenMint?: string;
  logoUrl?: string;
}

export interface LimitOrderV2PieChartResponse {
  tokens: ChartPieTokenData[];
  totalVolume?: number;
}
