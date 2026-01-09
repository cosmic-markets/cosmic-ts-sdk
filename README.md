# Cosmic TypeScript SDK 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-DeFi-14F195?logo=solana)](https://solana.com)
[![Cosmic Markets](https://img.shields.io/badge/Cosmic-Markets-9945FF)](https://cosmic.markets)

A comprehensive TypeScript SDK for accessing [Cosmic Markets](https://cosmic.markets) APIs, providing seamless integration with Solana DeFi protocols including Drift Protocol, Jupiter, Kamino, and more.

## ✨ Features

- 🎯 **Drift Protocol V2** - Markets, positions, orders, PnL history, and analytics
- 🔄 **Jupiter Integration** - DCA orders, limit orders, and token analytics  
- 💧 **Kamino Finance** - Swap data and analytics
- 📊 **OHLC Data** - Historical price data for tokens
- 👤 **Trader Profiles** - Trader scoring and performance metrics
- 🔍 **Token Search** - Comprehensive token discovery
- 🪶 **Minimal Dependencies** - Only minimal dependencies for a lightweight footprint

## 📦 Installation

To install via **npm**:

```bash
npm install github:cosmic-markets/cosmic-ts-sdk
```

Or via **Bun**:

```bash
bun add github:cosmic-markets/cosmic-ts-sdk
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { Cosmic } from 'cosmic-ts-sdk';

async function main() {
    // Initialize client (no API key = rate limits apply)
    const client = new Cosmic();

    // Fetch all Drift markets
    const markets = await client.drift.getAllMarkets();
    console.log(`📊 Found ${markets.content.length} markets`);
}

main();
```

### With API Key (Recommended)

```typescript
import { Cosmic } from 'cosmic-ts-sdk';

async function main() {
    // Initialize with API key for higher rate limits
    const client = new Cosmic("YOUR_API_KEY");
    
    // Your code here...
}
```

## 📚 Usage Examples

### Fetch Perpetual Positions

```typescript
import { Cosmic } from 'cosmic-ts-sdk';

async function main() {
    const client = new Cosmic();
    
    const wallet = "EXYq2HaS5nTarjzNHVYfcHbAbbLDJTPYkn1Jb5Q6bGz4";
    const positions = await client.drift.getUserPerpPositions(wallet);

    console.log(`📈 Found ${positions.length} active positions`);
    
    for (const pos of positions) {
        if (pos.marketName) {
            console.log(`Market: ${pos.marketName}`);
            console.log(`  Size: ${pos.baseAssetAmount || 0} ${pos.baseAssetSymbol || ''}`);
            console.log(`  Unrealized PnL: $${(pos.unrealizedPnl || 0).toFixed(2)}`);
        }
    }
}
```

### Query Jupiter DCA Orders

```typescript
import { Cosmic, GetDcaOrdersRequest } from 'cosmic-ts-sdk';

async function main() {
    const client = new Cosmic();

    const request: GetDcaOrdersRequest = {
        page: 1,
        size: 10
    };

    const orders = await client.jupiter.getOrders(request);
    console.log(`🔄 Found ${orders.content.length} DCA orders`);
}
```

### Fetch Market Data

```typescript
import { Cosmic, GetDriftMarketsRequest } from 'cosmic-ts-sdk';

async function main() {
    const client = new Cosmic();

    const request: GetDriftMarketsRequest = {
        size: 5
    };

    const markets = await client.drift.getAllMarkets(request);
    
    for (const market of markets.content) {
        console.log(`Market: ${market.name || 'Unknown'}`);
        console.log(`  Index: ${market.marketIndex}`);
    }
}
```

## 🔑 Authentication

To avoid strict rate limits, use an API key. You can purchase one at [cosmic.markets/api/docs](https://cosmic.markets/api/docs).

```typescript
const client = new Cosmic("YOUR_API_KEY");
```

## 📖 API Documentation

- 📘 [Official API Docs](https://cosmic.markets/api/docs)

## 🎯 Example Programs

Run these examples to see the SDK in action (using `bun`):

| Example | Command | Description |
|---------|---------|-------------|
| **Perp Positions** | `bun run examples/perp_positions.ts` | Retrieves active perpetual futures positions for a wallet |
| **PnL History** | `bun run examples/pnl_history.ts` | Analyzes settled PnL over time for a specific market |
| **DEX Volume** | `bun run examples/dex_volume.ts` | Tracks volume across Drift and Jupiter protocols |
| **Limit Orders** | `bun run examples/limit_orders.ts` | Inspects recent limit order activity on Jupiter |
| **DCA Orders** | `bun run examples/dca_orders.ts` | Inspects recent DCA order activity |

## 🧪 Running Tests

To run the integration tests:

```bash
bun test
```

## 🧩 Modules

| Module | Description |
|--------|-------------|
| **`drift`** | Drift Protocol V2 - Markets, positions, orders, history, and analytics |
| **`jupiter`** | Jupiter aggregator - DCA orders, limit orders, and token analytics |
| **`kamino`** | Kamino Finance - Swap data and analytics |
| **`ohlc`** | Historical OHLC price data for tokens |
| **`trader`** | Trader profiling, scoring, and performance metrics |
| **`search`** | Token search and discovery capabilities |

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- 🌐 [Cosmic Markets](https://cosmic.markets)
- 📚 [API Documentation](https://cosmic.markets/api/docs)
