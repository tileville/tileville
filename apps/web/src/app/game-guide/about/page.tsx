import React from "react";
import Image from "next/image";
import Link from "next/link";

export const teamMembers = [
  {
    name: "Satyam Bansal",
    role: "Founder & ZK Developer",
    bio: "Blockchain enthusiast with a passion for development.",
    image: "/img/avatars/1.jpeg",
  },
  {
    name: "Yash Mittal",
    role: "Lead Developer",
    bio: "Full-stack developer specialized in web3 technologies. Passionate about creating seamless user experiences in decentralized applications.",
    image: "/img/avatars/2.jpeg",
  },
  {
    name: "Ankita Dixit",
    role: "Designer and social media manager",
    bio: "Expert in designing and community building",
    image: "/img/avatars/3.jpeg",
  },
];

export default function AboutUsPage() {
  return (
    <div className="p-4 pb-20 pt-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-primary md:text-5xl">
            About TileVille
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Building the future of strategic gaming on the blockchain, one tile
            at a time.
          </p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
              Our Story
            </h2>
            <div className="space-y-4">
              <p>
                TileVille began as a passion project inspired by classic
                strategy games and the emerging possibilities of blockchain
                technology. Our founder, having spent years in traditional game
                development, saw an opportunity to create something truly unique
                by combining engaging gameplay with the transparency and
                ownership that blockchain enables.
              </p>
              <p>
                In early 2023, the initial concept for TileVille was sketched
                out - a strategic tile-placement game where players could
                compete directly against each other, own digital assets with
                real utility, and participate in a growing economy. We chose the
                Mina blockchain for its efficiency, security, and growing
                ecosystem.
              </p>
              <p>
                After months of development and testing with our early
                community, TileVille officially launched in Q1 2024. Today, were
                continuing to expand the game with new features, competitions,
                and opportunities for players to earn rewards while having fun.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-lg">
              <Image
                src="/img/avatars/nftsPreview.png"
                fill
                alt="TileVille Story"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mb-20 rounded-xl bg-primary/10 p-8 md:p-12">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary md:text-3xl">
            Our Mission
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-bold text-primary">Fun First</h3>
              <p>
                We believe games should be enjoyable above all else. While we
                embrace blockchain technology, our primary focus is creating
                engaging gameplay that keeps players coming back.
              </p>
            </div>
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-bold text-primary">
                True Ownership
              </h3>
              <p>
                Were committed to giving players real ownership of their digital
                assets. In TileVille, NFTs arent just collectibles—they have
                meaningful utility and value within the game ecosystem.
              </p>
            </div>
            <div className="rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-bold text-primary">
                Community Driven
              </h3>
              <p>
                Our community shapes the future of TileVille. We actively seek
                player feedback, involve the community in decision-making, and
                are building toward a decentralized governance structure.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-10 text-center text-2xl font-bold text-primary md:text-3xl">
            Meet the Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg border border-primary/20 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    width={300}
                    height={300}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary">{member.name}</h3>
                  <p className="mb-2 text-sm text-gray-600">{member.role}</p>
                  <p className="text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-primary/20 bg-white p-6">
              <h3 className="mb-3 text-xl font-semibold">Innovation</h3>
              <p>
                Were constantly exploring new ways to improve the gaming
                experience, pushing the boundaries of whats possible with
                blockchain technology while creating engaging gameplay
                mechanics.
              </p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-white p-6">
              <h3 className="mb-3 text-xl font-semibold">Transparency</h3>
              <p>
                We believe in open communication with our community. From
                development updates to prize pool distributions, we strive to
                make all aspects of TileVille transparent and verifiable.
              </p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-white p-6">
              <h3 className="mb-3 text-xl font-semibold">Accessibility</h3>
              <p>
                Were committed to making blockchain gaming accessible to
                everyone. TileVille is designed to be approachable for both
                crypto enthusiasts and traditional gamers alike.
              </p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-white p-6">
              <h3 className="mb-3 text-xl font-semibold">Quality</h3>
              <p>
                We hold ourselves to high standards in everything we do, from
                game design to technical implementation. Were dedicated to
                creating a polished, reliable, and enjoyable experience for all
                players.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20 rounded-xl bg-primary/10 p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary">
            Acknowledgments
          </h2>
          <p className="mb-4 text-center">
            TileVille was inspired by Six Sided Streets made by Chris Klimowski.
            Were grateful for the inspiration and have built upon this
            foundation to create a unique blockchain gaming experience.
          </p>
          <p className="text-center">
            We also want to thank the Mina Protocol team and community for their
            support, as well as our early players and testers who helped shape
            TileVille into what it is today.
          </p>
        </div>

        <div className="text-center">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            Join Us on Our Journey
          </h2>
          <p className="mx-auto mb-8 max-w-2xl">
            TileVille is just getting started, and were excited about the road
            ahead. Whether youre a player, developer, or blockchain enthusiast,
            we invite you to join our community and help shape the future of
            TileVille.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://t.me/tilevillegame"
              target="_blank"
              className="rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/80"
            >
              Join Our Community
            </Link>
            <Link
              href="/roadmap"
              className="rounded-full border border-primary bg-transparent px-6 py-3 text-primary hover:bg-primary/10"
            >
              View Our Roadmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
