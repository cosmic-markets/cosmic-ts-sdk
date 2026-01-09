import { Cosmic, GetDcaOrdersRequest, GetDriftMarketsRequest } from '../src/index.js';

async function main() {
  const client = new Cosmic();

  const request: GetDcaOrdersRequest = {
    page: 1,
    size: 10,
  };

  try {
    const orders = await client.jupiter.getOrders(request);
    console.log(`Found ${orders.content.length} orders`);
  } catch (e) {
    console.error("Error fetching DCA orders:", e);
  }

  // Example of Drift usage
  const marketsReq: GetDriftMarketsRequest = {
    size: 5,
  };

  try {
    const markets = await client.drift.getAllMarkets(marketsReq);
    console.log(`Found ${markets.content.length} markets`);
  } catch (e) {
    console.error("Error fetching Drift markets:", e);
  }
}

main();
