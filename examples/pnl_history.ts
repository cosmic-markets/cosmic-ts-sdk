import { Cosmic, GetDriftPerpPositionHistoryRequest } from '../src/index.js';

async function main() {
  const client = new Cosmic();

  const walletAddress = "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4";

  try {
    // 1. Get a market pubkey (e.g., SOL-PERP)
    const markets = await client.drift.getAllMarkets({});

    if (markets.content.length > 0) {
      const market = markets.content[0];
      if (market.publicKey) {
        console.log(`Analyzing PnL history for market: ${market.name || "Unknown"} (${market.publicKey})`);

        // 2. Fetch history
        const historyReq: GetDriftPerpPositionHistoryRequest = {
          startTime: 1700000000, // Example timestamp
        };

        const history = await client.drift.getPerpPositionHistory(
          walletAddress,
          market.publicKey,
          historyReq
        );

        console.log(`Found ${history.length} history entries`);

        for (const entry of history) {
          const pnl = entry.settledPnl || 0.0;
          console.log(`Time: ${entry.time || 0}, PnL: $${pnl.toFixed(2)}, Side: ${entry.positionSide || "Unknown"}`);
        }
      }
    } else {
      console.log("No markets found to analyze.");
    }
  } catch (e) {
    console.error("Error fetching PnL history:", e);
  }
}

main();
