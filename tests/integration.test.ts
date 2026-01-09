import { describe, test, expect, beforeAll } from "bun:test";
import { Cosmic } from "../src/index.js";
import {
  GetDcaOrdersRequest,
  GetDcaVolumeRequest,
  GetTokensRequest,
  GetLimitOrdersRequest,
  GetTopTokensByFilledVolumeRequest,
  GetTopTokensByFilledVolumeTableRequest,
  GetTopTokensByOpenOrdersRequest,
  GetLimitV2OrdersRequest,
  GetLimitOrderV2PieChartRequest,
  GetTopTradesFilledRequest,
  GetTopTokensFilledRequest,
} from "../src/models/jupiter.js";
import {
  GetDriftMarketsRequest,
  GetDriftMarketPerpPositionsRequest,
  GetDriftMarketSpotPositionsRequest,
  GetDriftPerpPositionHistoryRecentRequest,
  GetLatestDriftPerpHistoricalPositionsRequest,
  GetDriftMarketOrdersRequest,
  GetDriftUserOrdersRequest,
  GetDriftActiveAccountsRequest,
  GetDriftFilledTradesRequest,
} from "../src/models/drift.js";
import {
  GetKaminoSwapsRequest,
  GetKaminoTopFilledTradesRequest,
} from "../src/models/kamino.js";
import { GetOhlcRequest } from "../src/models/ohlc.js";
import { SearchTokensRequest } from "../src/models/search.js";

const DELAY = 1050;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Integration Tests", () => {
  let client: Cosmic;

  beforeAll(() => {
    client = new Cosmic();
  });

  // === DCA API TESTS ===
  test("getOrders", async () => {
    await sleep(DELAY);
    const request: GetDcaOrdersRequest = { size: 1 };
    const response = await client.jupiter.getOrders(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const order = response.content[0];
      expect(order.publicKey).toBeDefined();
      expect(order.userPublicKey).toBeDefined();
      expect(order.inputMint).toBeDefined();
      expect(order.outputMint).toBeDefined();
      expect(order.idx).toBeGreaterThanOrEqual(0);
      expect(order.nextCycleAt).toBeGreaterThan(0);
      expect(order.createdAt).toBeGreaterThan(0);
    }
  });

  test("getAggregatesVolume", async () => {
    await sleep(DELAY);
    const request: GetDcaVolumeRequest = {
      interval: "hour",
      start: 1704067200, // sample epoch
      end: 1704153600,
    };
    const response = await client.jupiter.getAggregatesVolume(request);

    if (response.labels.length > 0) {
      for (const dataset of response.datasets) {
        expect(dataset.label).toBeDefined();
        expect(dataset.data.length).toBe(response.labels.length);
      }
    }
  });

  test("getAggregateDcaData", async () => {
    await sleep(DELAY);
    const response = await client.jupiter.getAggregateDcaData();

    expect(response.length).toBeGreaterThan(0);

    for (const data of response) {
      expect(
        data.token ||
          data.tokenSymbol ||
          data.tokenMint ||
          data.buysUsd ||
          data.sellsUsd ||
          data.totalUsd
      ).toBeTruthy();
    }
  });

  test("getTokens", async () => {
    await sleep(DELAY);
    const request: GetTokensRequest = { size: 1 };
    const response = await client.jupiter.getTokens(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const token = response.content[0];
      expect(token.name).toBeDefined();
      expect(token.symbol).toBeDefined();
      expect(token.tokenMint).toBeDefined();
      expect(token.decimals).toBeGreaterThanOrEqual(0);
    }
  });

  test("getTokenDetail", async () => {
    await sleep(DELAY);
    const mint = "So11111111111111111111111111111111111111112";
    const response = await client.jupiter.getTokenDetail(mint);

    expect(response.token.name).toBeDefined();
    expect(response.token.symbol).toBeDefined();
    expect(response.token.tokenMint).toBe(mint);
    expect(response.token.decimals).toBeGreaterThanOrEqual(0);
  });

  test("getLimitOrders", async () => {
    await sleep(DELAY);
    const request: GetLimitOrdersRequest = { size: 1 };
    const response = await client.jupiter.getLimitOrders(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const order = response.content[0];
      expect(order.publicKey).toBeDefined();
      expect(order.maker).toBeDefined();
      expect(order.inputMint).toBeDefined();
      expect(order.outputMint).toBeDefined();
      expect(order.createdAt).toBeGreaterThan(0);
      expect(order.updatedAt).toBeGreaterThan(0);
      expect(order.inputDecimals).toBeGreaterThanOrEqual(0);
      expect(order.outputDecimals).toBeGreaterThanOrEqual(0);
    }
  });

  test("getLimitTopFilled", async () => {
    await sleep(DELAY);
    const request: GetTopTokensByFilledVolumeRequest = { limit: 5 };
    const response = await client.jupiter.getLimitTopFilled(request);

    expect(response.length).toBeGreaterThan(0);
    for (const token of response) {
      expect(token.mint).toBeDefined();
    }
  });

  test("getLimitTopFilledTable", async () => {
    await sleep(DELAY);
    const request: GetTopTokensByFilledVolumeTableRequest = { limit: 5 };
    const response = await client.jupiter.getLimitTopFilledTable(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBeLessThanOrEqual(response.size);

    for (const token of response.content) {
      expect(token.mint).toBeDefined();
    }
  });

  test("getLimitTopFilledChart", async () => {
    await sleep(DELAY);
    const request: GetTopTokensByFilledVolumeRequest = { limit: 5 };
    const response = await client.jupiter.getLimitTopFilledChart(request);

    expect(response.labels.length).toBeGreaterThan(0);
    expect(response.datasets.length).toBeGreaterThan(0);

    for (const dataset of response.datasets) {
      expect(dataset.label).toBeDefined();
      expect(dataset.data.length).toBe(response.labels.length);
    }
  });

  test("getLimitTopOpen", async () => {
    await sleep(DELAY);
    const request: GetTopTokensByOpenOrdersRequest = { hours: 24 };
    const response = await client.jupiter.getLimitTopOpen(request);

    expect(response.length).toBeGreaterThan(0);
    for (const token of response) {
      expect(token.mint).toBeDefined();
      expect(token.count).toBeGreaterThanOrEqual(0);
    }
  });

  test("getLimitV2Orders", async () => {
    await sleep(DELAY);
    const request: GetLimitV2OrdersRequest = { size: 1 };
    const response = await client.jupiter.getLimitV2Orders(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const order = response.content[0];
      expect(order.trader).toBeDefined();
      expect(order.inputMint).toBeDefined();
      expect(order.outputMint).toBeDefined();
      expect(order.inputAmount).toBeGreaterThanOrEqual(0);
      expect(order.outputAmount).toBeGreaterThanOrEqual(0);
    }
  });

  test("getLimitV2PieChart", async () => {
    await sleep(DELAY);
    const request: GetLimitOrderV2PieChartRequest = { days: 1 };
    const response = await client.jupiter.getLimitV2PieChart(request);

    expect(response.tokens.length).toBeGreaterThan(0);
    for (const token of response.tokens) {
      expect(
        token.token || token.tokenMint || token.volume !== undefined
      ).toBeTruthy();
    }
  });

  test("getHotTokens", async () => {
    await sleep(DELAY);
    const response = await client.jupiter.getHotTokens();

    expect(response.length).toBeGreaterThan(0);
    for (const token of response) {
      expect(token.tokenMint).toBeDefined();
    }
  });

  test("getTopTradesFilled", async () => {
    await sleep(DELAY);
    const request: GetTopTradesFilledRequest = { limit: 5 };
    const response = await client.jupiter.getTopTradesFilled(request);

    expect(response.length).toBeGreaterThan(0);
    for (const trade of response) {
      expect(
        trade.publicKey || trade.maker || trade.inputMint || trade.outputMint
      ).toBeTruthy();
    }
  });

  test("getTopTokensFilled", async () => {
    await sleep(DELAY);
    const request: GetTopTokensFilledRequest = { limit: 5 };
    const response = await client.jupiter.getTopTokensFilled(request);

    expect(response.length).toBeGreaterThan(0);
    for (const token of response) {
      expect(token.name).toBeDefined();
      expect(token.symbol).toBeDefined();
      expect(token.tokenMint).toBeDefined();
      expect(token.decimals).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDashboardPrices", async () => {
    await sleep(DELAY);
    const response = await client.jupiter.getDashboardPrices();
    expect(typeof response).toBe("object");
  });

  // === DRIFT API TESTS ===

  test("getDriftMarkets", async () => {
    await sleep(DELAY);
    const request: GetDriftMarketsRequest = { size: 250, page: 1 };
    const response = await client.drift.getAllMarkets(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBeLessThanOrEqual(response.size);

    if (response.content.length > 0) {
      const market = response.content[0];
      expect(market.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftMarketDetails", async () => {
    await sleep(DELAY);
    // SOL-PERP
    const response = await client.drift.getMarketDetails("8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W");

    expect(response.marketIndex).toBeGreaterThanOrEqual(0);
    if (response.publicKey) {
      expect(response.publicKey).toBeDefined();
    }
  });

  test("getDriftMarketStats", async () => {
    await sleep(DELAY);
    const response = await client.drift.getMarketStats({});

    expect(
      response.totalVolume !== undefined ||
        response.openInterest !== undefined ||
        response.activeTraders !== undefined
    ).toBeTruthy();

    if (response.activeTraders !== undefined) {
      expect(response.activeTraders).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftMarketPerpPositions", async () => {
    await sleep(DELAY);
    const request: GetDriftMarketPerpPositionsRequest = { size: 1 };
    const response = await client.drift.getMarketPerpPositions(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      request
    );

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const position = response.content[0];
      expect(position.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftMarketSpotPositions", async () => {
    await sleep(DELAY);
    const request: GetDriftMarketSpotPositionsRequest = { size: 1 };
    const response = await client.drift.getMarketSpotPositions(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      request
    );

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const position = response.content[0];
      expect(position.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftUserPositions", async () => {
    await sleep(DELAY);
    const response = await client.drift.getUserPositions(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4"
    );

    for (const position of response.perpPositions) {
      expect(position.marketIndex).toBeGreaterThanOrEqual(0);
    }
    for (const position of response.spotPositions) {
      expect(position.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftUserPerpPositions", async () => {
    await sleep(DELAY);
    const response = await client.drift.getUserPerpPositions(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4"
    );

    for (const position of response) {
      expect(position.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getTopActiveDriftPositions", async () => {
    await sleep(DELAY);
    const response = await client.drift.getTopActiveDriftPositions(5);

    for (const position of response) {
      expect(position.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftPerpPositionHistory", async () => {
    await sleep(DELAY);
    const response = await client.drift.getPerpPositionHistory(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4",
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      {}
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getDriftPerpPositionHistoryAllTime", async () => {
    await sleep(DELAY);
    const response = await client.drift.getPerpPositionHistoryAllTime(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4",
      "0"
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getDriftPerpPositionHistoryRecent", async () => {
    await sleep(DELAY);
    const request: GetDriftPerpPositionHistoryRecentRequest = { days: 7 };
    const response = await client.drift.getPerpPositionHistoryRecent(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4",
      "0",
      request
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getDriftPerpPositionHistoryByMarketPubkey", async () => {
    await sleep(DELAY);
    const response = await client.drift.getPerpPositionHistoryByMarketPubkey(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4",
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      {}
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getTopPositionsByNotionalSize", async () => {
    await sleep(DELAY);
    const response = await client.drift.getTopPositionsByNotionalSize(5);

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getTopPositionsByNotionalSizeForMarket", async () => {
    await sleep(DELAY);
    const response = await client.drift.getTopPositionsByNotionalSizeForMarket(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      5
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getPositionsByNotionalSizeThreshold", async () => {
    await sleep(DELAY);
    const response = await client.drift.getPositionsByNotionalSizeThreshold(
      1_000_000.0
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getLatestDriftPerpHistoricalPositions", async () => {
    await sleep(DELAY);
    const request: GetLatestDriftPerpHistoricalPositionsRequest = { limit: 5 };
    const response = await client.drift.getLatestDriftPerpHistoricalPositions(
      request
    );

    for (const history of response) {
      if (history.marketIndex !== undefined) {
        expect(history.marketIndex).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("getDriftMarketOrders", async () => {
    await sleep(DELAY);
    const request: GetDriftMarketOrdersRequest = { size: 1 };
    const response = await client.drift.getMarketOrders(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      request
    );

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const order = response.content[0];
      expect(order.orderId).toBeGreaterThanOrEqual(0);
      expect(order.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftUserOrders", async () => {
    await sleep(DELAY);
    const request: GetDriftUserOrdersRequest = { size: 1 };
    const response = await client.drift.getUserOrders(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4",
      request
    );

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const order = response.content[0];
      expect(order.orderId).toBeGreaterThanOrEqual(0);
      expect(order.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftAccountDetails", async () => {
    await sleep(DELAY);
    const response = await client.drift.getAccountDetails(
      "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4"
    );

    expect(response.length).toBeGreaterThan(0);

    for (const account of response) {
      expect(account.authority || account.userPublicKey).toBeTruthy();
    }
  });

  test("getDriftActiveAccounts", async () => {
    await sleep(DELAY);
    const request: GetDriftActiveAccountsRequest = { size: 1 };
    const response = await client.drift.getActiveAccounts(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    for (const account of response.content) {
      expect(account.authority || account.userPublicKey).toBeTruthy();
    }
  });

  test("getDriftVolume", async () => {
    await sleep(DELAY);
    const response = await client.drift.getTotalVolume({});

    expect(response.totalTrades).toBeGreaterThanOrEqual(0);
    expect(response.marketsWithVolume).toBeGreaterThanOrEqual(0);
    expect(response.uniqueTraders).toBeGreaterThanOrEqual(0);
    expect(response.timeRangeMinutes).toBeGreaterThanOrEqual(0);
    expect(response.timestamp).toBeGreaterThan(0);
  });

  test("getDriftMarketVolume", async () => {
    await sleep(DELAY);
    const response = await client.drift.getMarketVolume(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      {}
    );

    if (response.marketVolume !== undefined) {
      expect(response.marketVolume).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftFilledTrades", async () => {
    await sleep(DELAY);
    const request: GetDriftFilledTradesRequest = { size: 1 };
    const response = await client.drift.getFilledTrades(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const trade = response.content[0];
      expect(trade.orderId).toBeGreaterThanOrEqual(0);
      expect(trade.slot).toBeGreaterThanOrEqual(0);
      expect(trade.marketIndex).toBeGreaterThanOrEqual(0);
      expect(trade.direction).toBeGreaterThanOrEqual(0);
      expect(trade.orderType).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftMarketFilledTrades", async () => {
    await sleep(DELAY);
    const request: GetDriftFilledTradesRequest = { size: 1 };
    const response = await client.drift.getMarketFilledTrades(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      request
    );

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const trade = response.content[0];
      expect(trade.orderId).toBeGreaterThanOrEqual(0);
      expect(trade.slot).toBeGreaterThanOrEqual(0);
      expect(trade.marketIndex).toBeGreaterThanOrEqual(0);
      expect(trade.direction).toBeGreaterThanOrEqual(0);
      expect(trade.orderType).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftOrderbook", async () => {
    await sleep(DELAY);
    const response = await client.drift.getMarketOrderbook(
      "8UJgxaiQx5nTrdDgph5FiahMmzduuLTLf5WmsPegYA6W",
      {}
    );

    for (const bid of response.bids) {
      expect(bid.price).toBeGreaterThan(0);
      expect(bid.size).toBeGreaterThanOrEqual(0);
    }

    for (const ask of response.asks) {
      expect(ask.price).toBeGreaterThan(0);
      expect(ask.size).toBeGreaterThanOrEqual(0);
    }
  });

  test("getDriftMarketAnalytics", async () => {
    await sleep(DELAY);
    const response = await client.drift.getMarketAnalytics({});

    expect(response.length).toBeGreaterThan(0);
    for (const analytics of response) {
      expect(analytics.marketIndex).toBeGreaterThanOrEqual(0);
    }
  });

  // === KAMINO API TESTS ===

  test("getKaminoSwaps", async () => {
    await sleep(DELAY);
    const request: GetKaminoSwapsRequest = { size: 1 };
    const response = await client.kamino.getActiveSwaps(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const swap = response.content[0];
      expect(swap.initialInputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.expectedOutputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.remainingInputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.filledOutputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.lastUpdatedTimestamp).toBeGreaterThan(0);
    }
  });

  test("getKaminoAllSwaps", async () => {
    await sleep(DELAY);
    const request: GetKaminoSwapsRequest = { size: 1 };
    const response = await client.kamino.getAllSwaps(request);

    expect(response.page).toBeGreaterThanOrEqual(0);
    expect(response.size).toBeGreaterThan(0);
    expect(response.totalElements).toBeGreaterThanOrEqual(0);
    expect(response.totalPages).toBeGreaterThanOrEqual(0);
    expect(response.content.length).toBe(response.size);

    if (response.content.length > 0) {
      const swap = response.content[0];
      expect(swap.initialInputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.expectedOutputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.remainingInputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.filledOutputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.lastUpdatedTimestamp).toBeGreaterThan(0);
    }
  });

  test("getKaminoOrderbook", async () => {
    await sleep(DELAY);
    const response = await client.kamino.getSolUsdcOrderbook();

    for (const bid of response.bids) {
      expect(bid.price).toBeGreaterThan(0);
      expect(bid.size).toBeGreaterThanOrEqual(0);
    }
    for (const ask of response.asks) {
      expect(ask.price).toBeGreaterThan(0);
      expect(ask.size).toBeGreaterThanOrEqual(0);
    }
  });

  test("getKaminoTopTraders", async () => {
    await sleep(DELAY);
    const response = await client.kamino.getTopTraders({});
    // Just verify it doesn't throw
    expect(response).toBeDefined();
  });

  test("getKaminoChart", async () => {
    await sleep(DELAY);
    const response = await client.kamino.getSwapVolumeChartData();

    expect(response.length).toBeGreaterThan(0);
    for (const data of response) {
      expect(data.label).toBeDefined();
      expect(data.value).toBeGreaterThanOrEqual(0);
    }
  });

  test("getKaminoTopTokens", async () => {
    await sleep(DELAY);
    const response = await client.kamino.getTopTokens({});

    expect(response.length).toBeGreaterThan(0);
    for (const token of response) {
      expect(token.mint).toBeDefined();
    }
  });

  test("getKaminoTopFilledTrades", async () => {
    await sleep(DELAY);
    const request: GetKaminoTopFilledTradesRequest = {};
    const response = await client.kamino.getTopFilledTrades(request);

    expect(response.length).toBeGreaterThan(0);
    for (const swap of response) {
      expect(swap.initialInputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.expectedOutputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.remainingInputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.filledOutputAmount).toBeGreaterThanOrEqual(0);
      expect(swap.lastUpdatedTimestamp).toBeGreaterThan(0);
    }
  });

  // === OHLC API TESTS ===
  test("getOhlc", async () => {
    await sleep(DELAY);
    const request: GetOhlcRequest = { limit: 1 };
    const response = await client.ohlc.getLatestOhlc(
      "So11111111111111111111111111111111111111112",
      "hour",
      request
    );

    expect(response.length).toBeGreaterThan(0);
    for (const ohlc of response) {
      expect(ohlc.open).toBeGreaterThan(0);
      expect(ohlc.high).toBeGreaterThan(0);
      expect(ohlc.low).toBeGreaterThan(0);
      expect(ohlc.close).toBeGreaterThan(0);
      expect(ohlc.time).toBeGreaterThan(0);
      expect(ohlc.high).toBeGreaterThanOrEqual(ohlc.low);
    }
  });

  test("getRecentOhlc", async () => {
    await sleep(DELAY);
    const response = await client.ohlc.getRecentOhlc();

    for (const [tokenId, ohlcData] of Object.entries(response)) {
      expect(tokenId).toBeDefined();
      expect(ohlcData.length).toBeGreaterThan(0);
      for (const ohlc of ohlcData) {
        expect(ohlc.open).toBeGreaterThan(0);
        expect(ohlc.high).toBeGreaterThan(0);
      }
    }
  });

  // === SEARCH API TESTS ===
  test("searchTokens", async () => {
    await sleep(DELAY);
    const request: SearchTokensRequest = { q: "SOL", size: 1 };
    const response = await client.search.searchTokens(request);

    expect(response.length).toBeGreaterThan(0);
    for (const token of response) {
      expect(token.name).toBeDefined();
      expect(token.symbol).toBeDefined();
      expect(token.tokenMint).toBeDefined();
    }
  });

  // === TRADER API TESTS ===
  test("getTraderProfile", async () => {
    await sleep(DELAY);
    const authority = "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4";
    const response = await client.trader.getTraderProfile(authority, {});

    expect(response.authority).toBe(authority);
    // Optional fields check if present
    if (response.recentDriftTrades) {
        for (const trade of response.recentDriftTrades) {
            expect(trade.orderId).toBeGreaterThanOrEqual(0);
        }
    }
  });
});
