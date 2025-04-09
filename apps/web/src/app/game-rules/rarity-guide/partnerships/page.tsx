export default function Partnerships() {
  const partners = [
    {
      category: "Technical Partners",
      companies: [
        {
          name: "Mina Protocol",
          description:
            "Blockchain foundation supporting TileVille with technological infrastructure and developer resources.",
        },
        {
          name: "ZkLabs",
          description:
            "Zero-knowledge proof specialists collaborating on innovative gameplay verification mechanisms.",
        },
      ],
    },
    {
      category: "Gaming Collaborations",
      companies: [
        {
          name: "PixelCraft Studios",
          description:
            "Indie game developer partnering on cross-promotional activities and shared game assets.",
        },
        {
          name: "GameFi Alliance",
          description:
            "Consortium of web3 gaming projects working together to advance blockchain gaming standards.",
        },
      ],
    },
    {
      category: "NFT Marketplaces",
      companies: [
        {
          name: "MinaNFT",
          description:
            "Primary marketplace integration for TileVille NFTs with exclusive listing benefits.",
        },
        {
          name: "Collectible Worlds",
          description:
            "Secondary marketplace featuring verified TileVille collections and special events.",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">Partnerships</h1>

      <p className="mb-8 text-lg">
        TileVille collaborates with industry leaders to enhance the gaming
        experience and expand our ecosystem. These strategic partnerships bring
        value to our players and strengthen the foundation of our platform.
      </p>

      <div className="space-y-10">
        {partners.map((category, categoryIndex) => (
          <section key={categoryIndex}>
            <h2 className="mb-4 text-2xl font-bold">{category.category}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {category.companies.map((company, companyIndex) => (
                <div
                  key={companyIndex}
                  className="rounded-lg bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-xl font-bold">{company.name}</h3>
                  <p className="text-gray-600">{company.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Become a Partner</h2>
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
          <p className="mb-4">
            Interested in partnering with TileVille? Were always looking for
            innovative collaborations that benefit our community and expand the
            possibilities within our ecosystem.
          </p>
          <p className="mb-4">
            Whether youre a blockchain project, game developer, content creator,
            or other organization, wed love to explore potential synergies.
          </p>
          <p className="mb-4">
            Partnership inquiries can be directed to our team at
            partnerships@tileville.xyz
          </p>
        </div>
      </section>
    </div>
  );
}
