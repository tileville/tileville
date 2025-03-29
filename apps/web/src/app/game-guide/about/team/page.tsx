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

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Meet Our Team
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          The builders and visionaries behind TileVille
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member: any) => (
          <div
            key={member.name}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {member.name.charAt(0)}
            </div>
            <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
            <p className="text-sm text-primary">{member.role}</p>
            <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
