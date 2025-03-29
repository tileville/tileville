export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-primary">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: March 25, 2025</p>

      <div className="mt-8 space-y-8">
        {TERMS_SECTIONS.map((section, index) => (
          <section key={index} className="prose max-w-none">
            <h2 className="text-xl font-bold text-primary">{section.title}</h2>
            <div className="mt-4 text-gray-700">{section.content}</div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-primary/10 p-6">
        <h2 className="text-lg font-bold text-primary">Contact</h2>
        <p className="mt-2 text-gray-600">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mt-2 font-medium">legal@tileville.xyz</p>
      </div>
    </div>
  );
}

const TERMS_SECTIONS = [
  {
    title: "Agreement to Terms",
    content: (
      <p>
        By accessing or using TileVille, you agree to be bound by these Terms of
        Service. If you disagree with any part of the terms, you may not access
        the service. These Terms apply to all visitors, users, and others who
        access or use the service.
      </p>
    ),
  },
  {
    title: "Blockchain Interactions",
    content: (
      <p>
        TileVille operates on the Mina blockchain. By using our service, you
        acknowledge that all blockchain transactions are irreversible and final.
        You are responsible for the security of your wallet and private keys. We
        cannot assist in recovering lost or stolen cryptographic assets.
      </p>
    ),
  },
  {
    title: "User Accounts",
    content: (
      <>
        <p>
          When you create an account with us, you must provide accurate
          information. You are responsible for:
        </p>
        <ul className="list-disc pl-5">
          <li>Maintaining the security of your wallet and private keys</li>
          <li>Any activities that occur through your account</li>
          <li>Notifying us immediately of any unauthorized use</li>
        </ul>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p>
        The service and its original content, features, and functionality are
        and will remain the exclusive property of TileVille and its licensors.
        NFTs purchased through our platform grant you specific rights as defined
        in our NFT License Terms, but do not transfer copyright or intellectual
        property rights to the underlying artwork or game assets.
      </p>
    ),
  },
  {
    title: "User Conduct",
    content: (
      <>
        <p>You agree not to use the service to:</p>
        <ul className="list-disc pl-5">
          <li>Violate any laws or regulations</li>
          <li>Impersonate any person or entity</li>
          <li>
            Engage in any activity that interferes with or disrupts the service
          </li>
          <li>
            Attempt to gain unauthorized access to the service or related
            systems
          </li>
          <li>Manipulate or exploit game mechanics for unfair advantage</li>
          <li>Engage in any fraudulent activity</li>
        </ul>
      </>
    ),
  },
  {
    title: "Termination",
    content: (
      <p>
        We may terminate or suspend your account immediately, without prior
        notice or liability, for any reason whatsoever, including without
        limitation if you breach the Terms. Upon termination, your right to use
        the service will immediately cease.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        In no event shall TileVille, nor its directors, employees, partners,
        agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from your access to or use of or inability
        to access or use the service.
      </p>
    ),
  },
];
