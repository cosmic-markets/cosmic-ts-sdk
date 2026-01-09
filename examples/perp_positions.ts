import { Cosmic } from '../src/index.js';

async function main() {
  // Initialize the client (optionally with API key)
  const client = new Cosmic();

  // Example wallet address (Drift Protocol V2)
  const walletAddress = "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4"; // Replace with real wallet
  console.log(`Fetching perp positions for wallet: ${walletAddress}`);

  try {
    // Fetch user positions
    const positions = await client.drift.getUserPerpPositions(walletAddress);

    console.log(`Found ${positions.length} active perp positions`);

    for (const pos of positions) {
      if (pos.marketName) {
        console.log(`Market: ${pos.marketName}`);
        console.log(`  Size: ${pos.baseAssetAmount || 0.0} ${pos.baseAssetSymbol || ''}`);
        console.log(`  Entry: $${pos.quoteEntryAmount || 0.0}`);
        console.log(`  Unrealized PnL: $${(pos.unrealizedPnl || 0.0).toFixed(2)}`);
        console.log(`  Side: ${pos.positionSide || 'Unknown'}`);
        console.log("-------------------");
      }
    }
  } catch (e) {
    console.error("Error fetching perp positions:", e);
  }
}

main();
