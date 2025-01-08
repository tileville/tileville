type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const faqContent: {
  id: string;
  title: string;
  faqs: FAQ[];
}[] = [
  {
    id: "general",
    title: "General",
    faqs: [
      {
        id: 1,
        question: "What is TileVille?",
        answer:
          "TileVille is a strategic city-building game on the Mina blockchain, where players construct and manage their own cities on the  island of Nicobar using hexagonal tiles.",
      },
      {
        id: 2,
        question: "How do I start playing TileVille?",
        answer:
          "To start playing TileVille, you'll need a Mina wallet(Currently Auro wallet is supported) and some Mina tokens (for participating in competitions). Visit our website, connect your wallet, and join the next available competition.",
      },
      {
        id: 3,
        question: "Is TileVille free-to-play?",
        answer:
          "Depends on the competition participation fees. If the competition you are joining doesn’t have a participation fees, you can play the game for free.",
      },
      {
        id: 4,
        question:
          "Is TileVille inspired by another game? If yes, how do you acknowledge and give credit to the original work",
        answer:
          "Yes, TileVille takes inspiration from the web2 game Six Sided Streets by Chris Klimowski. We want to acknowledge and give proper credit to the original work that inspired the core gameplay mechanics and visual aesthetic of TileVille. While TileVille introduces its own unique elements, such as blockchain integration, decentralized governance, and NFT ownership, the fundamental concept of building cities using hexagonal tiles was inspired by Six Sided Streets. We believe in recognizing and respecting the creativity and innovation that came before us",
      },
    ],
  },
  {
    id: "gameplay",
    title: "Gameplay",
    faqs: [
      {
        id: 1,
        question: "What are the different tile types in TileVille?",
        answer:
          "The current tile types are trees, roads, and windmills. More tile types, such as residential, commercial, and industrial, will be introduced in future updates.",
      },
      {
        id: 2,
        question: "How do the scoring mechanism works ?",
        answer:
          "You earn points by connecting the city center to the port with road tiles, placing windmills on hills, and forming parks with tree tiles. take a quick game tour to understand the scoring mechanism.",
      },
      {
        id: 3,
        question: "What are the Builder NFTs, and what do they do?",
        answer:
          " Builder NFTs are non-fungible tokens that grant special abilities and powers in the game. Initially, they will provide basic bonuses, but their functionality will expand in future updates.",
      },
    ],
  },
  {
    id: "competitions",
    title: "Competition & Rewards",
    faqs: [
      {
        id: 1,
        question: "How do competitions work in TileVille?",
        answer:
          "Players participate in competitions by paying an entry fee. During the competition, they construct their cities on the map, aiming to earn the highest score. At the end, the top 3 players receive rewards distributed as 65%, 22%, and 13% of the total competition pool.",
      },
      {
        id: 2,
        question: "How can I join a competition?",
        answer:
          "Competitions are announced on our website and social media channels. You can join by connecting your Mina wallet and paying the entry fee before the competition starts.",
      },
      {
        id: 3,
        question: "What happens to the cities I build during competitions?",
        answer:
          "The cities you build during competitions will become NFTs that you own. In the future, you'll be able to purchase islands and develop these cities further.",
      },
      {
        id: 4,
        question: "What counts as a 'Win' in TileVille competitions?",
        answer:
          "In TileVille, a 'Win' is achieved when you place in the Top 10 of any competition. Each competition can only count as one win toward your total wins, even if you have multiple high-scoring entries in that competition. For example, if you place 3rd and 8th in the same competition, it counts as one win. If you place in the top 10 in three different competitions, you'll have three wins. This system rewards consistent high performance across multiple competitions rather than just one-time high scores.",
      },
      {
        id: 5,
        question:
          "Can the one wallet address win muliple prize in the same competition",
        answer:
          "If the same user is listed multiple times on the leaderboard, we will consider their highest rank only. The subsequent positions will be adjusted to ensure each prize goes to a different player. For instance, if User A is first and third, User A will receive the prize for the first rank, and the player who is second will remain second, while the player who is fourth will move up to third place.",
      },
      {
        id: 6,
        question: "What is the reward payout mechanism?",
        answer:
          "We're currently handling the payout. However, we're working on automating this process to allow users to claim their winnings directly from their profile section.",
      },
      {
        id: 7,
        question:
          "What happens if two players have the same score on the leaderboard?",
        answer:
          "if two players achieve the same score on the leaderboard, the player who reached that score first will be ranked higher. In other words, the earlier you achieve a particular score, the better your chances of being placed higher on the leaderboard.\n For example,  if Player A and Player B both score 100 points, but Player A reached 100 points before Player B, then Player A will be placed higher on the leaderboard.",
      },
    ],
  },
  {
    id: "governance_treasury",
    title: "Governance & Treasury",
    faqs: [
      {
        id: 1,
        question:
          "What role do NFT holders play in the governance of TileVille?",
        answer:
          "TileVille is committed to decentralized governance, and NFT holders will have an active say in the game's development and decision-making processes. Each NFT holder will have one vote, allowing them to participate in voting on proposed changes, new features, and other important matters related to the game.",
      },
      {
        id: 2,
        question: "How will the proceeds from NFT sales be managed?",
        answer:
          "All proceeds generated from the sale of NFTs, such as Builder NFTs and other in-game assets, will be added to the TileVille treasury. This treasury will be governed by the community and used to fund ongoing development, maintenance, and improvements to the game.",
      },
      {
        id: 3,
        question: "What is the TileVille treasury, and how will it be managed?",
        answer:
          "The TileVille treasury is a decentralized fund that will be used to support the game's long-term growth and sustainability. The treasury will be managed transparently, with regular updates on its balance and expenditures. Decisions on how to allocate funds from the treasury will be made through community voting, ensuring that NFT holders have a direct say in how resources are utilized.",
      },
      {
        id: 4,
        question: "How will voting on proposals and changes work?",
        answer:
          "Voting mechanisms will be implemented to allow NFT holders to participate in the decision-making process. Proposals for changes or new features will be submitted, and NFT holders will be able to cast their votes. Proposals that receive a majority vote will be approved and implemented by the development team.",
      },
      {
        id: 5,
        question:
          "Will there be any measures in place to prevent centralization of voting power?",
        answer:
          "Yes, we understand the importance of maintaining decentralization and preventing any single entity from gaining too much voting power. Measures such as vote weighting based on NFT holdings or quadratic voting mechanisms will be explored to ensure fair and balanced governance.",
      },
      {
        id: 6,
        question:
          "How will the development team ensure transparency and accountability?",
        answer:
          "Transparency and accountability are crucial for effective community governance. The development team will provide regular updates on the game's progress, roadmap, and financial standing. Additionally, all major decisions and voting results will be publicly shared, and the community will have access to audited reports on the treasury's management.",
      },
    ],
  },
  {
    id: "furtherupdates",
    title: "Further Updates",
    faqs: [
      {
        id: 1,
        question: "Will there be new maps and levels in TileVille?",
        answer:
          "Yes, we plan to introduce multiple maps and levels with different terrains and challenges in future updates.",
      },
      {
        id: 2,
        question: "Will TileVille have a multiplayer mode?",
        answer:
          "Multiplayer modes, including player-vs-player (PvP) and player-vs-environment (PvE), are planned for future updates.",
      },
      {
        id: 3,
        question:
          "Will players be able to create and share content in TileVille?",
        answer:
          "Yes, we aim to introduce user-generated content, such as custom maps and levels, as well as modding support, in later phases of the roadmap.",
      },
    ],
  },
  {
    id: "tileville-builder-nfts",
    title: "TileVille Builder NFTs",
    faqs: [
      {
        id: 1,
        question: "What is the utility of TileVille Builder NFTs?",
        answer:
          "TileVille Builder NFTs provide various in-game benefits, including unique abilities, efficiency boosts, and specialized skills that enhance your city-building experience. They also grant voting rights in the TileVille DAO, allowing you to influence the game's future development.",
      },
      {
        id: 2,
        question: "How do the NFT traits affect gameplay?",
        answer:
          "Each NFT trait corresponds to specific in-game bonuses. For example, a Builder with high Sustainability Rating may receive bonuses when placing eco-friendly structures, while one with Wind Whisperer affinity might boost windmill efficiency. These traits directly impact your strategy and city's performance.",
      },
      {
        id: 3,
        question: "What is the TileVille DAO and how does it work?",
        answer:
          "The TileVille DAO (Decentralized Autonomous Organization) allows NFT holders to participate in game governance. Members can propose and vote on game updates, new features, and other important decisions affecting TileVille's future.",
      },
      {
        id: 4,
        question: "How can I participate in governance with my Builder NFT?",
        answer:
          "As a Builder NFT holder, you automatically gain voting rights in the TileVille DAO. You can participate in governance by submitting proposals and voting on community decisions through our dedicated governance platform.",
      },
      {
        id: 5,
        question: "Are there different rarity levels for Builder NFTs?",
        answer:
          "Yes, Builder NFTs have varying rarity levels based on their trait combinations. Rarer NFTs may have more powerful or unique abilities, making them particularly valuable for gameplay and collecting.",
      },
      {
        id: 6,
        question: "Can I upgrade or evolve my Builder NFT?",
        answer:
          "Currently, Builder NFTs cannot be upgraded or evolved. However, we're exploring future features that might allow for NFT progression or enhancement based on in-game achievements or community feedback.",
      },
      {
        id: 7,
        question: "How many Builder NFTs can I use in the game at once?",
        answer:
          "Players can only use one Builder NFT per game session. However, you can own multiple NFTs and switch between them to suit different strategies or game modes.",
      },
      {
        id: 8,
        question: "Will there be more Builder NFT collections in the future?",
        answer:
          "Yes, we plan to release additional Builder NFT collections in the future. Each new collection may introduce new traits, abilities, or specializations to keep the gameplay fresh and exciting.",
      },
      {
        id: 9,
        question: "Can I trade or sell my Builder NFT?",
        answer:
          "Yes, TileVille Builder NFTs are fully owned by you and can be traded or sold on compatible NFT marketplaces. Always ensure you're using trusted platforms for any transactions.",
      },
      {
        id: 10,
        question:
          "How do I claim in-game rewards associated with my Builder NFT?",
        answer:
          "In-game rewards are automatically applied when you play with your Builder NFT. Additional rewards or airdrops for NFT holders will be announced through our official channels, with clear instructions on how to claim them.",
      },
    ],
  },
];
