import { ClientInner } from '../client.js';
import { SolanaToken } from '../models/common.js';
import { SearchTokensRequest } from '../models/search.js';

interface SearchResponse {
  content: SolanaToken[];
}

export class SearchApi {
  constructor(private client: ClientInner) {}

  async searchTokens(request: SearchTokensRequest): Promise<SolanaToken[]> {
    const response = await this.client.get<SearchResponse>('/api/search', request);
    return response.content;
  }
}
