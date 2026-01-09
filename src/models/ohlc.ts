export interface OhlcvData {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

export interface RecentOhlcResponse {
  [key: string]: OhlcvData[];
}

export interface GetOhlcRequest {
  limit?: number;
}
