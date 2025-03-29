export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-primary">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: March 25, 2025</p>

      <div className="mt-8 space-y-8">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title} className="prose max-w-none">
            <h2 className="text-xl font-bold text-primary">{section.title}</h2>
            <div className="mt-4 text-gray-700">{section.content}</div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-primary/10 p-6">
        <h2 className="text-lg font-bold text-primary">Contact Us</h2>
        <p className="mt-2 text-gray-600">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p className="mt-2 font-medium">privacy@tileville.xyz</p>
      </div>
    </div>
  );
}

const PRIVACY_SECTIONS = [
  {
    title: "Introduction",
    content: (
      <p>
        TileVille is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, and safeguard your information when you
        use our service. We respect your privacy and are committed to protecting
        your personal data. By using TileVille, you agree to the collection and
        use of information in accordance with this policy.
      </p>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <>
        <p>We collect several types of information for various purposes:</p>
        <ul className="list-disc pl-5">
          <li>Blockchain wallet addresses (public keys only)</li>
          <li>Game performance data and scores</li>
          <li>Optional profile information (username, avatar, social links)</li>
          <li>Technical data (browser type, access time, pages visited)</li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the collected data for various purposes:</p>
        <ul className="list-disc pl-5">
          <li>To provide and maintain our service</li>
          <li>To verify game transactions on the blockchain</li>
          <li>To notify you about competitions and events</li>
          <li>To improve our service and user experience</li>
          <li>To detect and prevent fraudulent activity</li>
        </ul>
      </>
    ),
  },
  {
    title: "Blockchain Data",
    content: (
      <p>
        TileVille operates on the Mina blockchain. Information stored on the
        blockchain, including wallet addresses and transaction data, is publicly
        accessible. We use zero-knowledge proofs to enhance privacy where
        possible, but blockchain data is inherently public. Please consider this
        before engaging with our platform.
      </p>
    ),
  },
  {
    title: "Data Sharing",
    content: (
      <p>
        We do not sell your personal data. We may share anonymized game data for
        research purposes or to improve our services. We may disclose your
        information if required by law or to protect our rights and the safety
        of our users.
      </p>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to our processing of your data</li>
          <li>Request restriction of processing</li>
          <li>Data portability</li>
        </ul>
      </>
    ),
  },
];
