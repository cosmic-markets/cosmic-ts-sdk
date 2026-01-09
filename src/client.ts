import { DriftApi } from './api/drift.js';
import { JupiterApi } from './api/jupiter.js';
import { KaminoApi } from './api/kamino.js';
import { OhlcApi } from './api/ohlc.js';
import { SearchApi } from './api/search.js';
import { TraderApi } from './api/trader.js';

export class ClientInner {
  constructor(public baseUrl: string, public apiKey?: string) {}

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    // path should be relative, e.g. /api/drift/markets
    // If path starts with /, remove it to append to baseUrl cleanly if baseUrl ends with /
    // But URL constructor handles this well if we use it correctly.
    
    // Ensure baseUrl doesn't have trailing slash if we append /...
    // Or just use URL constructor.
    const url = new URL(path, this.baseUrl);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    let urlPath = path;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
          } else {
            searchParams.append(key, String(value));
          }
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        urlPath += `?${queryString}`;
      }
    }
    return this.request<T>(urlPath, { method: 'GET' });
  }
}

export class Cosmic {
  public drift: DriftApi;
  public jupiter: JupiterApi;
  public kamino: KaminoApi;
  public ohlc: OhlcApi;
  public search: SearchApi;
  public trader: TraderApi;

  constructor(apiKey?: string, baseUrl: string = "https://api.cosmic.markets") {
    const client = new ClientInner(baseUrl, apiKey);
    this.drift = new DriftApi(client);
    this.jupiter = new JupiterApi(client);
    this.kamino = new KaminoApi(client);
    this.ohlc = new OhlcApi(client);
    this.search = new SearchApi(client);
    this.trader = new TraderApi(client);
  }
}
