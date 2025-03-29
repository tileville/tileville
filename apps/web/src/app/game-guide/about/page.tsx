import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          About TileVille
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Building the future of blockchain gaming on Mina Protocol
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-primary">Our Story</h2>
          <div className="mt-4 space-y-4 text-gray-600">
            <p>
              TileVille began as a simple idea: what if we could combine the
              strategic depth of city-building games with the transparency and
              security of blockchain technology?
            </p>
            <p>
              Founded in 2024 by a team of blockchain enthusiasts and game
              developers, TileVille was built to showcase the potential of Mina
              Protocols lightweight blockchain and zero-knowledge proofs in
              gaming.
            </p>
            <p>
              Our vision is to create an engaging gaming experience where
              players have true ownership of their in-game assets and
              achievements, while maintaining privacy and security through
              advanced cryptographic techniques.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
          <div className="mt-4 space-y-4 text-gray-600">
            <p>
              TileVille aims to make blockchain gaming accessible to everyone by
              creating intuitive, engaging experiences that utilize blockchain
              technology without requiring deep technical knowledge.
            </p>
            <p>
              We believe that games should be fun first, with blockchain
              enhancing the experience rather than defining it. Our goal is to
              create a sustainable gaming ecosystem where players, creators, and
              developers can all thrive.
            </p>
            <p>
              Through innovative use of zero-knowledge proofs, were pushing the
              boundaries of whats possible in blockchain gaming while
              maintaining the highest standards of user privacy and security.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-primary/5 p-8">
        <h2 className="text-2xl font-bold text-primary">Why Mina Protocol?</h2>
        <div className="mt-4 text-gray-600">
          <p>
            Mina Protocols unique architecture makes it ideal for gaming
            applications:
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-md bg-white p-4 shadow-sm">
              <span className="font-bold text-primary">
                Lightweight blockchain
              </span>
              <p className="mt-2 text-sm">
                Mina stays at a constant 22KB size, enabling fast verification
                and low hardware requirements.
              </p>
            </li>
            <li className="rounded-md bg-white p-4 shadow-sm">
              <span className="font-bold text-primary">
                Zero-knowledge proofs
              </span>
              <p className="mt-2 text-sm">
                Allowing private computation while maintaining verifiability of
                game actions and results.
              </p>
            </li>
            <li className="rounded-md bg-white p-4 shadow-sm">
              <span className="font-bold text-primary">Developer-friendly</span>
              <p className="mt-2 text-sm">
                Built with TypeScript support and developer tools that make
                building blockchain applications accessible.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary">Join Our Community</h2>
        <p className="mt-3 text-center text-gray-600">
          TileVille is more than just a game—its a community of players,
          builders, and blockchain enthusiasts.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/team"
            className="rounded-md bg-primary px-5 py-2 text-white hover:bg-primary/90"
          >
            Meet Our Team
          </Link>
          <a
            href="https://t.me/tilevilleBugs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary px-5 py-2 text-primary hover:bg-primary/5"
          >
            Join Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
