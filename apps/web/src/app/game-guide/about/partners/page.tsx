export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Our Partners
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Working together to build the future of blockchain gaming
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 rounded-md bg-gray-100 p-4 text-center">
              <span className="text-lg font-bold text-primary">
                {partner.name}
              </span>
            </div>
            <p className="mb-4 flex-grow text-sm text-gray-500">
              {partner.description}
            </p>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">{partner.type}</span>
              <a
                href={partner.website}
                className="font-medium text-primary hover:underline"
              >
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-primary">
          Interested in partnering with TileVille?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">
          We are always looking for new collaborations to enhance the TileVille
          ecosystem
        </p>
        <a
          href="mailto:partnerships@tileville.xyz"
          className="mt-4 inline-block rounded-md bg-primary px-5 py-2 text-white hover:bg-primary/90"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

const PARTNERS = [
  {
    name: "Mina Protocol",
    type: "Blockchain Partner",
    description:
      "Providing the lightweight blockchain foundation for our zero-knowledge applications.",
    website: "https://minaprotocol.com",
  },
  {
    name: "zkIgnite",
    type: "Funding Program",
    description:
      "Supporting innovative projects building on Mina Protocol with grants and resources.",
    website: "https://zkignite.minaprotocol.com",
  },
  {
    name: "MinaNFT",
    type: "Technical Partner",
    description:
      "Powering our NFT infrastructure with advanced zero-knowledge technology.",
    website: "#",
  },
  {
    name: "zKNOID Games",
    type: "Game Development Partner",
    description:
      "Collaborating on cross-game experiences and shared technology.",
    website: "https://app.zknoid.io/",
  },
  {
    name: "MinaScan",
    type: "Explorer Partner",
    description:
      "Providing transparent blockchain data and transaction verification.",
    website: "https://minascan.io/",
  },
  {
    name: "Auro Wallet",
    type: "Wallet Partner",
    description:
      "Enabling secure transactions and identity management for TileVille players.",
    website: "https://aurowallet.io/",
  },
];
