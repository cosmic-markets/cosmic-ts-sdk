export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface SolanaToken {
  name: string;
  symbol: string;
  tokenMint: string;
  decimals: number;
  logoUrl?: string;
  price?: number;
  marketCap?: number;
  dcaVolumePastDay?: number;
  updatedDate?: number;
}
