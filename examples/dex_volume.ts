import { Cosmic, GetDcaVolumeRequest, GetDriftVolumeRequest } from '../src/index.js';

async function main() {
  const client = new Cosmic();

  // 1. Get Drift Total Volume
  console.log("--- Drift Protocol Volume ---");
  const driftVolReq: GetDriftVolumeRequest = { minutes: 1440 }; // 24 hours
  try {
    const vol = await client.drift.getTotalVolume(driftVolReq);
    console.log(`24h Volume: $${(vol.totalVolume || 0.0).toFixed(2)}`);
    console.log(`Trades: ${vol.totalTrades}`);
    console.log(`Markets with Volume: ${vol.marketsWithVolume}`);
    console.log(`Unique Traders: ${vol.uniqueTraders}`);
  } catch (e) {
    console.log(`Error fetching Drift volume: ${e}`);
  }

  // 2. Get Jupiter DCA Volume
  console.log("\n--- Jupiter DCA Volume ---");
  const now = Math.floor(Date.now() / 1000);
  const dayAgo = now - 86400;

  const dcaVolReq: GetDcaVolumeRequest = {
    interval: "day",
    start: dayAgo,
    end: now,
  };

  try {
    const data = await client.jupiter.getAggregatesVolume(dcaVolReq);
    console.log(`Fetched DCA volume data points: ${data.datasets.length}`);
  } catch (e) {
    console.log(`Error fetching DCA volume: ${e}`);
  }
}

main();
