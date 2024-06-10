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
];
