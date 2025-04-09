import Link from "next/link";

export default function About() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      bio: "Blockchain enthusiast with 5+ years experience in web3 development and game design",
    },
    {
      name: "Maya Rodriguez",
      role: "Creative Director",
      bio: "Award-winning game designer specializing in city-building and strategy games",
    },
    {
      name: "Sanjay Patel",
      role: "Blockchain Architect",
      bio: "Mina Protocol expert focusing on zkApp development and zero-knowledge proofs",
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] p-4 pt-20 md:p-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-5xl">
        About TileVille
      </h1>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
          <p className="mb-4 text-lg">
            TileVille is reimagining city-building games for the web3 era,
            combining engaging gameplay with blockchain technology to create a
            truly player-owned experience.
          </p>
          <p className="text-lg">
            We believe games should be fun, fair, and provide real ownership to
            players. By building on the Mina Protocol, were creating a
            sustainable gaming ecosystem that respects privacy while enabling
            true digital ownership.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">The TileVille Story</h2>
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">Origins</h3>
            <p>
              TileVille was born from a simple idea: what if we could combine
              the nostalgic joy of classic city-builders with the innovative
              potential of blockchain? Our team of gaming enthusiasts and
              blockchain developers came together in 2023 to transform this
              concept into reality.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">Why Mina Protocol?</h3>
            <p>
              We chose to build on Mina Protocol for its unique approach to
              blockchain technology. As the worlds lightest blockchain, Mina
              provides a perfect foundation for our gaming experience - fast,
              scalable, and with a focus on privacy through zero-knowledge
              proofs.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">
              Community-Driven Development
            </h3>
            <p>
              From day one, TileVille has been shaped by our incredible
              community. Player feedback drives our development roadmap, and
              were committed to building a game that truly belongs to its
              players.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Our Technology</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">Blockchain Integration</h3>
            <p>
              TileVille leverages Mina Protocols capabilities to provide
              verifiable gameplay, true ownership of in-game assets, and secure
              transaction processing. Our smart contracts are designed for
              transparency and efficiency.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">NFT Technology</h3>
            <p>
              Our NFTs arent just collectibles - theyre functional assets that
              enhance gameplay. Each TileVille Builder NFT carries unique traits
              that influence city development, creating a dynamic connection
              between collectibility and utility.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">Game Architecture</h3>
            <p>
              Built with a modern tech stack including Next.js, TypeScript, and
              Supabase, TileVille offers a seamless gaming experience that
              bridges web2 usability with web3 capabilities.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-bold">Zero-Knowledge Proofs</h3>
            <p>
              We utilize zk-SNARKs for certain game mechanics, enabling complex
              computations to be verified without revealing sensitive data -
              protecting both the integrity of the game and player privacy.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Meet the Team</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
              <p className="mb-3 font-medium text-primary">{member.role}</p>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Join Our Journey</h2>
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
          <p className="mb-4 text-lg">
            TileVille is more than a game - its a growing ecosystem and
            community. Whether youre a player, creator, or blockchain
            enthusiast, theres a place for you in our world.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/community"
              className="rounded-md bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/80"
            >
              Join Our Community
            </Link>
            <Link
              href="/marketplace"
              className="rounded-md border border-primary bg-white px-6 py-2 text-primary transition-colors hover:bg-primary/5"
            >
              Explore NFTs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
