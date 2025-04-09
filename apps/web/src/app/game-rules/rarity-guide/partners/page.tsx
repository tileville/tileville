const PartnerCard = ({
  name,
  type,
  description,
}: {
  name: string;
  type: string;
  description: string;
}) => (
  <div className="rounded-lg bg-primary/10 p-6 transition-colors hover:bg-primary/20">
    <div className="mx-auto mb-4 h-16 w-32 rounded-md bg-primary/30"></div>
    <h3 className="mb-1 text-center text-xl font-bold">{name}</h3>
    <p className="mb-3 text-center text-sm text-primary">{type}</p>
    <p className="text-sm">{description}</p>
  </div>
);

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-[1200px] p-6 pt-20">
      <h1 className="mb-2 text-3xl font-extrabold text-primary">
        Our Partners
      </h1>
      <p className="mb-12 text-lg">
        Organizations working with TileVille to create an extraordinary gaming
        experience
      </p>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Blockchain Partners
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PartnerCard
            name="MINA Protocol"
            type="Blockchain Foundation"
            description="As our primary blockchain partner, MINA Protocol provides the secure, scalable foundation for TileVille's decentralized features, NFT minting, and transaction processing."
          />

          <PartnerCard
            name="BlockBerry Analytics"
            type="Blockchain Data Provider"
            description="BlockBerry provides real-time transaction monitoring and blockchain analytics services to ensure transparency and reliability of all in-game transactions."
          />

          <PartnerCard
            name="Pinata IPFS"
            type="Decentralized Storage"
            description="Our partnership with Pinata ensures that all NFT metadata and images are stored in a decentralized manner, guaranteeing permanent accessibility and asset security."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Technology Partners
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PartnerCard
            name="MinaNFT"
            type="NFT Infrastructure"
            description="MinaNFT provides the specialized infrastructure for creating, distributing, and managing the unique NFTs that power TileVille's Builder system and collectibles."
          />

          <PartnerCard
            name="ZK Cloud Worker"
            type="Zero-Knowledge Computation"
            description="Advanced zero-knowledge proof technology that enables secure verification of game transactions without compromising player privacy or game integrity."
          />

          <PartnerCard
            name="Algolia"
            type="Search Technology"
            description="Powering TileVille's marketplace search, Algolia helps players quickly find the perfect NFTs and connect with the community through lightning-fast, relevant search results."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Gaming Partners
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <PartnerCard
            name="ZKNOID Games"
            type="Game Developer"
            description="Collaborating with ZKNOID Games allows TileVille to offer integrated gaming experiences and cross-platform NFT utility, expanding the ecosystem for players."
          />

          <PartnerCard
            name="Minaty Studios"
            type="NFT Collection Partner"
            description="This collaboration brings the popular Minaty character collection to TileVille, offering players unique building themes and gameplay elements."
          />

          <PartnerCard
            name="MinaPunks"
            type="NFT Collection Partner"
            description="MinaPunks enhances TileVille with their iconic character designs and special abilities, creating unique gaming experiences for collectors."
          />

          <PartnerCard
            name="ZKGod Collective"
            type="NFT Collection Partner"
            description="The partnership with ZKGod brings exclusive, limited-edition Builder NFTs with special attributes focused on privacy and security themes."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Community Partners
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PartnerCard
            name="Tileville Academy"
            type="Educational Platform"
            description="This educational initiative provides tutorials, workshops, and resources to help players master TileVille mechanics and blockchain gaming fundamentals."
          />

          <PartnerCard
            name="DAO Gaming Guild"
            type="Player Organization"
            description="The largest community-run organization of TileVille players, organizing tournaments, providing mentorship, and representing player interests in game development."
          />
        </div>
      </div>

      <div className="rounded-lg bg-primary/20 p-8">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Become a Partner
        </h2>
        <p className="mb-6">
          TileVille is always looking to collaborate with innovative
          organizations that share our vision for the future of gaming,
          blockchain technology, and digital ownership. If youre interested in
          partnering with us, wed love to hear from you.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white/30 p-4">
            <h3 className="mb-2 font-bold">Technology Integration</h3>
            <p className="text-sm">
              Have a technology that could enhance the TileVille experience?
              Were interested in integrations that improve gameplay, security,
              or user experience.
            </p>
          </div>

          <div className="rounded-lg bg-white/30 p-4">
            <h3 className="mb-2 font-bold">NFT Collections</h3>
            <p className="text-sm">
              Bring your NFT collection into the TileVille ecosystem with
              functional gameplay elements and special abilities that make your
              characters unique.
            </p>
          </div>

          <div className="rounded-lg bg-white/30 p-4">
            <h3 className="mb-2 font-bold">Promotional Partnerships</h3>
            <p className="text-sm">
              Engage with our active community through sponsored competitions,
              exclusive rewards, and co-marketing opportunities.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary/80">
            Contact Partnership Team
          </button>
        </div>
      </div>
    </div>
  );
}
