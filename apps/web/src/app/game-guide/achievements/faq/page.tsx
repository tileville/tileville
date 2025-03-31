import { Metadata } from "next";
import Link from "next/link";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    questions: [
      {
        id: "what-is-tileville",
        question: "What is TileVille?",
        answer:
          "TileVille is a strategic city-building game built on the Mina Protocol blockchain. Players can build and manage virtual cities, compete in tournaments, challenge other players, and collect unique NFTs that enhance gameplay.",
      },
      {
        id: "how-to-start",
        question: "How do I get started with TileVille?",
        answer:
          "To get started, you'll need a Mina Protocol wallet like Auro Wallet. Connect your wallet to TileVille, create a profile, and you can begin playing free games or join competitions. Check out our Gameplay Guide for more detailed instructions.",
      },
      {
        id: "cost-to-play",
        question: "Does it cost money to play TileVille?",
        answer:
          "TileVille offers both free gameplay options and paid competitions. While you can enjoy basic gameplay for free, participating in tournaments and collecting NFTs will require MINA tokens. Competition entry fees typically range from 1-5 MINA.",
      },
      {
        id: "device-requirements",
        question: "What devices can I play TileVille on?",
        answer:
          "TileVille is a web-based game that works on most modern browsers. You can play on desktop computers, laptops, tablets, and mobile phones. For the best experience, we recommend using a device with a screen size of at least 7 inches.",
      },
    ],
  },
  {
    id: "gameplay",
    title: "Gameplay",
    questions: [
      {
        id: "game-objective",
        question: "What is the objective of the game?",
        answer:
          "The main objective of TileVille is to build a thriving, sustainable city by strategically placing different types of tiles. You'll need to balance resources, manage growth, and create the most efficient city layout to earn the highest score.",
      },
      {
        id: "game-duration",
        question: "How long does a typical game last?",
        answer:
          "A standard TileVille game typically takes 15-30 minutes to complete. Speed challenges can be shorter, while tournament games with complex objectives might take longer. You can save your progress and return later in some game modes.",
      },
      {
        id: "scoring-system",
        question: "How is my score calculated?",
        answer:
          "Your score is calculated based on several factors: population happiness (30%), economic output (25%), environmental impact (20%), infrastructure efficiency (15%), and city aesthetics (10%). Different Builder NFTs can modify these weightings slightly based on their specializations.",
      },
      {
        id: "tile-types",
        question: "What types of tiles are available?",
        answer:
          "TileVille offers various tile categories including Residential (houses, apartments), Commercial (shops, offices), Infrastructure (roads, power plants), Environmental (parks, lakes), and Special tiles (landmarks, city hall). Each type has different effects on your city. Check our Tiles Catalog for detailed information.",
      },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Wallet",
    questions: [
      {
        id: "why-blockchain",
        question: "Why is TileVille built on blockchain?",
        answer:
          "Blockchain technology allows for true ownership of in-game assets (NFTs), transparent competition results, secure transactions, and verifiable gameplay. By building on Mina Protocol, we can offer a decentralized gaming experience with actual ownership of digital assets.",
      },
      {
        id: "wallet-setup",
        question: "How do I set up a wallet for TileVille?",
        answer:
          "We recommend using Auro Wallet for TileVille. Visit the Auro Wallet website or download the browser extension, create a new wallet, and securely store your recovery phrase. Once set up, you can connect your wallet to TileVille by clicking the 'Connect Wallet' button in the top right corner.",
      },
      {
        id: "transaction-fees",
        question: "What are transaction fees?",
        answer:
          "Transaction fees (also called gas fees) are small amounts of MINA required to process transactions on the blockchain. These fees are paid to network validators and vary based on network congestion. TileVille does not control or receive these fees.",
      },
      {
        id: "secure-wallet",
        question: "How do I keep my wallet secure?",
        answer:
          "To keep your wallet secure: Never share your private key or recovery phrase with anyone, use a strong password, enable two-factor authentication if available, be cautious of phishing attempts, and consider using a hardware wallet for large holdings. Remember, if you lose access to your wallet, we cannot recover it for you.",
      },
    ],
  },
  {
    id: "nfts",
    title: "NFTs & Marketplace",
    questions: [
      {
        id: "tileville-builder-nfts",
        question: "What are TileVille Builder NFTs?",
        answer:
          "Builder NFTs are special non-fungible tokens that provide gameplay advantages in TileVille. Each Builder has unique traits like Sustainability Rating, Efficiency Level, Environmental Affinity, Urban Planning Expertise, and Special Ability. These traits influence how you play the game and can give you advantages in certain strategies.",
      },
      {
        id: "nft-benefits",
        question: "How do NFTs benefit my gameplay?",
        answer:
          "Builder NFTs enhance your gameplay by providing bonuses to specific aspects of city building. For example, an Eco Architect might provide bonuses to environmental elements, while a Transport Planner could improve road network efficiency. The right NFT can significantly boost your score when used with a compatible strategy.",
      },
      {
        id: "buying-nfts",
        question: "How do I buy TileVille NFTs?",
        answer:
          "You can purchase NFTs directly from our Marketplace section using MINA tokens. Connect your wallet, browse available NFTs, and click 'Mint' to purchase. You can also buy NFTs from other players on secondary marketplaces that support Mina Protocol NFTs.",
      },
      {
        id: "nft-collections",
        question: "What NFT collections are available?",
        answer:
          "TileVille currently offers several NFT collections: TileVille Builders (original collection with city building specialists), Minaty (character-based NFTs), MinaPunks (stylized avatar NFTs), ZkGod (privacy-themed NFTs), and Zeko (animal-themed collectibles). Each collection has different traits and benefits.",
      },
    ],
  },
  {
    id: "competitions",
    title: "Competitions & Rewards",
    questions: [
      {
        id: "competition-types",
        question: "What types of competitions are available?",
        answer:
          "TileVille offers several competition types: Regular tournaments with standard rules, themed challenges with special objectives, seasonal events with unique tiles, speed building challenges with time constraints, and PvP challenges where you compete directly against other players.",
      },
      {
        id: "entry-requirements",
        question: "What do I need to join a competition?",
        answer:
          "To join a competition, you need a connected wallet with sufficient MINA tokens to cover the entry fee (typically 1-5 MINA). Some competitions may have additional requirements such as owning specific NFTs or having achieved certain gameplay milestones.",
      },
      {
        id: "prize-distribution",
        question: "How are competition prizes distributed?",
        answer:
          "Prize distribution varies by competition type. Generally, prizes are distributed automatically via smart contracts once the competition ends and results are verified. PvP challenge rewards are sent directly to the winner's wallet. All transactions are visible on the blockchain for transparency.",
      },
      {
        id: "create-challenge",
        question: "How do I create a PvP challenge?",
        answer:
          "To create a PvP challenge, go to the PvP section, click 'Create Challenge', set your parameters (entry fee, time limit, max participants), and confirm the transaction. You'll need to pay the entry fee yourself, which becomes part of the prize pool. Once created, you can share the invite link with friends or the community.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    questions: [
      {
        id: "create-profile",
        question: "How do I create a TileVille profile?",
        answer:
          "After connecting your wallet, go to the Profile section and click 'Create Profile'. Choose a unique username, add an optional avatar and social media links, and save your changes. Your profile will be associated with your wallet address and visible to other players.",
      },
      {
        id: "change-username",
        question: "Can I change my username?",
        answer:
          "Yes, you can change your username through your profile settings. However, to prevent abuse, username changes are limited to once every 30 days. Choose wisely as your username appears on leaderboards and in competitions.",
      },
      {
        id: "follow-players",
        question: "How do I follow other players?",
        answer:
          "To follow other players, visit their profile page and click the 'Follow' button. You'll see updates about their achievements in your activity feed. Following players is a great way to build connections in the TileVille community.",
      },
      {
        id: "connect-social",
        question: "How do I connect my social media accounts?",
        answer:
          "You can connect your social media accounts in your profile settings. Currently, we support Twitter, Discord, and Telegram connections. These connections help verify your identity and enable additional social features. You can control the privacy of each connected account.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Support",
    questions: [
      {
        id: "transaction-failed",
        question: "My transaction failed. What should I do?",
        answer:
          "If your transaction failed, first check if you have enough MINA to cover both the transaction amount and gas fees. If funds aren't the issue, wait a few minutes and try again as network congestion might be the cause. If problems persist, check our Discord for network status updates or contact support with your transaction details.",
      },
      {
        id: "game-crash",
        question: "The game crashed during play. Is my progress lost?",
        answer:
          "TileVille auto-saves your progress at regular intervals during gameplay. If the game crashes, you should be able to resume from the last save point when you return. In competition modes, we have additional safeguards to ensure fair play in case of technical issues.",
      },
      {
        id: "performance-issues",
        question: "How can I improve game performance?",
        answer:
          "To improve performance: Close other browser tabs and applications, clear your browser cache, use a wired internet connection if possible, disable browser extensions, and ensure your device meets our minimum requirements. You can also try our 'Low Performance Mode' in the settings.",
      },
      {
        id: "contact-support",
        question: "How do I contact support?",
        answer:
          "For support, visit our Help Center or join our Discord community where our team regularly provides assistance. For specific account issues, email support@tileville.xyz with details of your problem, including any relevant screenshots or transaction hashes.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "TileVille FAQ",
  description: "Frequently asked questions about TileVille",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600">
          Find answers to common questions about TileVille
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {faqCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-md border border-primary bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
            >
              {category.title}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {faqCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-16">
            <h2 className="mb-6 text-2xl font-bold">{category.title}</h2>
            <div className="space-y-4">
              {category.questions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="mb-3 text-lg font-semibold">
                    {item.question}
                  </h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Still have questions?</h2>
        <p className="mb-4">
          If you couldnt find the answer you were looking for, reach out to our
          community or support team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Contact Support
          </Link>
          <Link
            href="https://discord.gg/tileville"
            className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
          >
            Join Discord
          </Link>
        </div>
      </div>
    </div>
  );
}
