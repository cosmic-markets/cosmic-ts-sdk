import { Cosmic, GetLimitOrdersRequest } from '../src/index.js';

async function main() {
  const client = new Cosmic();

  console.log("Fetching recent Jupiter limit orders...");

  const req: GetLimitOrdersRequest = {
    filter: "recent",
    size: 20,
  };

  try {
    const orders = await client.jupiter.getLimitOrders(req);
    console.log(`Found ${orders.content.length} recent limit orders`);

    for (const order of orders.content) {
      console.log(`Order: ${order.publicKey}`);
      console.log(`  Input Mint: ${order.inputMint}`);
      console.log(`  Output Mint: ${order.outputMint}`);
      console.log(`  In Amount: ${order.makingAmount || 0.0}`);
      console.log(`  Out Amount: ${order.takingAmount || 0.0}`);
      console.log(`  Progress: ${((order.progress || 0.0) * 100.0).toFixed(2)}%`);
      console.log("-------------------");
    }
  } catch (e) {
    console.error("Error fetching limit orders:", e);
  }
}

main();
