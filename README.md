# MINAPolis: Strategic City Development Game

# Overview

MINAPolis is a city-building arcade game on the MINA blockchain that brings strategic gameplay to new heights. You build your city with ROAD, WindMill and Tree hexagonal tiles and if you build a well-planned city, you win rewards.


Navigate the maze of choices as you construct roads, connecting ports to the heart of your city for valuable points. Harness the power of windmills, strategically placing them on hills for maximum efficiency. And don't forget about parks—group them together in threes to create lush oases of greenery, each cluster a beacon of beauty and bounty.

Here's the deal: for just 2 MINA tokens, you unlock the gates to MINAPolis. Your mission? To strategically place trios of hexes, each decision influencing the growth and prosperity of your city. But beware, the path to urban greatness is fraught with challenges and opportunities.


Score above 70, and you've ascended to Level 1—a feat worthy of celebration. Your reward? A treasure trove awaits, packed with ERC20 and ERC721 asset prizes, including MINA tokens and coveted NFTs. Plus, claim your rightful place on the leaderboard and showcase your city-building prowess to the world.


# Why MINAPolis

As a dedicated arcade gamer, I've yearned for the thrill of the arcade experience on the blockchain—a world where nostalgia meets innovation. Picture this: I slide my 2 MINA coins into a digital slot machine, playing the game, and I design a perfect city. And when I win, there it is—the coveted treasure box, brimming with exciting prizes like MINA tokens, rare NFTs, and exclusive vouchers.

But it's not just about the thrill of winning; it's about the camaraderie of competition. I want to pit my skills against fellow gamers, engaging in high-stakes tournaments where every move counts.
Yet, in the realm of Web2-based arcade games, this dream feels distant. These games, governed by centralised authorities, lack the essence of true arcade gaming. The need to link my credit card feels invasive, and the exorbitant fees—like a 30% cut of my hard-earned winnings—only add insult to injury.



# Game Architecture

MINAPolis consists of two primary components: smart contract and the game client app.

Here is the brief explantation of both components:

## smart contract
Before diving deep into the game mechanics, lets first go through the building blocks or models of the game.

for the sake of understanding, we can imagine them as a struct and any new game will be instance of these structs.

1. TileType: can be one of the following values: Empty, WindMill, Park, Street, Car, Port

2. Tile: consists of following fields

  - tile_id: number

  - row: number

  - col: number

  - game_id: number

  - tile_type: TileType

  - is_hill: boolean

3. Player:

  - player_id: number

  - player_address: string(player's wallet address)

 4. Game

  - game_id: number

  - player_id: number

  - score: number

  - remaining_moves: number (default value is 24 for level 1)

  - txn_hash: string (txn hash for entry fees payment)

  - start_time: Date

![Game model architecture](/docs/minapolis_architecture.png)



Now lets recap the game rules quickly so you have context when reading implementation details.

Player places three tiles at a time to build the city.
Tile type can be either Road, Park, or WindMill.
You can rotate the tile set in any direction
You place your tile strategically such that
 Road wants to connect port to the city-center
 Wind mills wants to be alone and on hills
 Parks want to be grouped together in multiple of 3
As soon as you run out of moves or there is no space on map to place a tileset, game is over

 

To achieve this, smart contract exposes two interface methods name

- spawn()

- place_tiles()

spawn()

spawn method gets called when user starts a new game. It takes care of following things

- transfer entry fees from user's wallet to game treasury

- Initialise a new game by creating instance of Game struc


 

place_tiles(tiles: Tile[])

place_tiles method gets called when user places the tileset on the client

call syntax will look similar to

place_tiles([{row: 3, col: 4, tile_type: Road}, {row: 3, col: 5, tile_type: Park}, {row: 3, col: 6, tile_type: WindMill}])

Proof generated from `place_tiles` action will be recursively merged in previous proofs. In this way there will be only one transaction per game(at the end of the game.). 

place_tiles takes care of following things

- validate tile coordinates are within map range

- validate remaining_moves > 0

- validate coordinates are empty for that particular game

- validate all the tiles in tileset are connected.

- calculate score for placing the tiles as per game rules

- Update game score



# Local Setup
Start a frontend

```
cd frontend
yarn
yarn run dev
```


Visual Theme and game Asset credit:
Six Sided Streets (Chris Klimowski)


# Reference Links

- MINA Explorer(https://minaexplorer.com/)
- MINA Scan (https://minascan.io/)
- 