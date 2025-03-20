# TileVille Developer Documentation

Welcome to the TileVille developer documentation. This guide provides information for developers who want to build on or integrate with the TileVille platform.

## Table of Contents

1. [Overview](#overview)
2. [API Reference](#api-reference)
3. [Authentication](#authentication)
4. [Competition Integration](#competition-integration)
5. [NFT Integration](#nft-integration)
6. [Webhook Events](#webhook-events)
7. [Widget Integration](#widget-integration)
8. [Best Practices](#best-practices)
9. [Rate Limits](#rate-limits)
10. [Example Applications](#example-applications)

## Overview

TileVille is a blockchain-based city-building game built on the Mina Protocol. The platform offers various integration points for developers:

- **Public APIs** for accessing game data, competitions, and leaderboards
- **NFT Integration** for creating and verifying custom Builder NFTs
- **Webhook Events** for real-time notifications
- **Embeddable Widgets** for displaying TileVille content on your website

## API Reference

Our REST API allows developers to access TileVille data programmatically. Base URL for all API endpoints:

```
https://api.tileville.xyz/v1
```

### Available Endpoints

#### Competitions

- `GET /competitions` - List all active competitions
- `GET /competitions/{competition_key}` - Get details of a specific competition
- `GET /competitions/{competition_key}/leaderboard` - Get competition leaderboard

#### Players

- `GET /players/{wallet_address}` - Get public player profile
- `GET /players/{wallet_address}/competitions` - Get player's competition history
- `GET /players/{wallet_address}/nfts` - Get player's NFT collection

#### NFTs

- `GET /nfts` - List available NFTs
- `GET /nfts/{nft_id}` - Get details of a specific NFT
- `GET /nfts/collections` - List all NFT collections

#### Response Format

All endpoints return data in JSON format. Example response:

```json
{
  "success": true,
  "data": {
    // Relevant data here
  },
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100,
    "items_per_page": 20
  }
}
```

Error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {}
  }
}
```

## Authentication

API access requires authentication using JWT tokens. To obtain an API key:

1. Create a developer account on the TileVille Developer Portal
2. Generate an API key from your dashboard
3. Include the API key in the `Authorization` header of your requests:

```
Authorization: Bearer YOUR_API_KEY
```

For endpoints that access user-specific data, you'll need to implement the Mina Protocol signature verification flow:

1. Request the user to sign a message using their Mina wallet
2. Verify the signature on your backend
3. Include the wallet address and signature in your API requests

## Competition Integration

### Custom Competitions

Partners can create white-labeled competitions through our Partner API:

1. Define competition parameters (duration, entry fee, prize structure)
2. Customize the visual theme
3. Set specific objectives or scoring criteria

Example competition creation request:

```json
POST /partners/competitions
{
  "name": "Sustainable City Challenge",
  "description": "Build the most environmentally friendly city",
  "start_date": "2025-06-01T00:00:00Z",
  "end_date": "2025-06-15T23:59:59Z",
  "entry_fee": 1.5,
  "max_participants": 500,
  "prize_pool": 500,
  "custom_theme": {
    "primary_color": "#00A080",
    "secondary_color": "#005040",
    "logo_url": "https://example.com/logo.png"
  }
}
```

### Embedding Competitions

You can embed TileVille competitions directly into your website using our JavaScript SDK:

```html
<div
  id="tileville-competition"
  data-competition-key="summer_2025_challenge"
></div>
<script>
  TileVille.initCompetition({
    elementId: "tileville-competition",
    apiKey: "YOUR_API_KEY",
    onComplete: (result) => {
      console.log("Player completed with score:", result.score);
    },
  });
</script>
```

## NFT Integration

### Creating Compatible Builder NFTs

Partners can create custom Builder NFTs that function within the TileVille ecosystem:

1. Design NFT artwork and attributes
2. Define special abilities and bonuses
3. Register the collection with TileVille
4. Deploy using our Partner NFT contract

Builder NFT attributes must follow our standard schema:

```json
{
  "name": "Urban Planner #123",
  "description": "A master of city efficiency",
  "image": "ipfs://...",
  "attributes": [
    {
      "trait_type": "Sustainability Rating",
      "value": "Gold"
    },
    {
      "trait_type": "Efficiency Level",
      "value": "Expert"
    },
    {
      "trait_type": "Environmental Affinity",
      "value": "Water Guardian"
    },
    {
      "trait_type": "Urban Planning Expertise",
      "value": "Residential Developer"
    },
    {
      "trait_type": "Special Ability",
      "value": "Home Sweet Home"
    }
  ]
}
```

### Validating NFT Ownership

Use our verification endpoints to confirm NFT ownership:

```
GET /nfts/verify?wallet_address={address}&nft_id={id}
```

## Webhook Events

Subscribe to real-time events by registering webhook URLs in the Developer Portal:

1. Create a webhook endpoint on your server
2. Register the URL in the Developer Portal
3. Select the events you wish to receive
4. Implement signature verification for security

Available events:

- `competition.created` - New competition announced
- `competition.started` - Competition has begun
- `competition.ended` - Competition has ended
- `player.joined_competition` - Player joined a competition
- `player.completed_game` - Player completed a game
- `nft.minted` - New NFT was minted
- `nft.transferred` - NFT ownership changed

Example webhook payload:

```json
{
  "event": "player.completed_game",
  "timestamp": "2025-06-02T15:30:45Z",
  "data": {
    "wallet_address": "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
    "competition_key": "summer_2025_challenge",
    "score": 8753,
    "game_id": 123456
  },
  "signature": "..."
}
```

## Widget Integration

Embed TileVille content directly into your website with our customizable widgets:

### Leaderboard Widget

```html
<div
  id="tileville-leaderboard"
  data-competition-key="summer_2025_challenge"
></div>
<script src="https://cdn.tileville.xyz/js/widgets.js"></script>
<script>
  TileVille.initLeaderboard({
    elementId: "tileville-leaderboard",
    limit: 10,
    showWalletAddresses: false,
  });
</script>
```

### Player Profile Widget

```html
<div
  id="tileville-profile"
  data-wallet-address="B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8"
></div>
<script src="https://cdn.tileville.xyz/js/widgets.js"></script>
<script>
  TileVille.initProfile({
    elementId: "tileville-profile",
    showStats: true,
    showNFTs: true,
  });
</script>
```

### City Showcase Widget

```html
<div id="tileville-showcase" data-game-id="123456"></div>
<script src="https://cdn.tileville.xyz/js/widgets.js"></script>
<script>
  TileVille.initShowcase({
    elementId: "tileville-showcase",
    interactive: true,
  });
</script>
```

## Best Practices

1. **Cache Responses**: Most TileVille data doesn't change frequently. Implement proper caching to reduce API load.

2. **Implement Pagination**: When fetching large datasets, always use pagination parameters to improve performance.

3. **Handle Rate Limits Gracefully**: Implement exponential backoff for retries when hitting rate limits.

4. **Secure API Keys**: Never expose your API keys in client-side code. Use a backend proxy for API requests.

5. **Validate Webhook Signatures**: Always verify the signature of incoming webhook events to prevent spoofing.

## Rate Limits

API rate limits are applied based on your developer tier:

| Tier       | Requests per minute | Daily quota | Monthly quota |
| ---------- | ------------------- | ----------- | ------------- |
| Free       | 60                  | 5,000       | 50,000        |
| Basic      | 300                 | 25,000      | 500,000       |
| Premium    | 1,200               | 100,000     | 2,000,000     |
| Enterprise | Custom              | Custom      | Custom        |

Rate limit headers are included in all API responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1614556800
```

## Example Applications

Here are some example integration scenarios:

### Community Leaderboard Site

```javascript
async function fetchTopPlayers() {
  const response = await fetch(
    "https://api.tileville.xyz/v1/competitions/current/leaderboard?limit=100",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const data = await response.json();
  renderLeaderboard(data.data);
}
```

### NFT Marketplace Integration

```javascript
async function verifyTilevilleNFT(nftId, walletAddress) {
  const response = await fetch(
    `https://api.tileville.xyz/v1/nfts/verify?nft_id=${nftId}&wallet_address=${walletAddress}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data.success;
}
```

### Competition Results Tracker

```javascript
// Set up webhook endpoint
app.post("/webhook/tileville", (req, res) => {
  const signature = req.headers["x-tileville-signature"];

  // Verify signature
  if (!verifySignature(req.body, signature, WEBHOOK_SECRET)) {
    return res.status(401).send("Invalid signature");
  }

  const event = req.body;

  if (event.event === "competition.ended") {
    notifyUsers(event.data.competition_key);
  }

  res.status(200).send("OK");
});
```

For full code examples, please visit our [GitHub repository](https://github.com/tileville/tileville).
