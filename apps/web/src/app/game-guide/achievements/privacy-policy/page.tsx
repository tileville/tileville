import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Privacy Policy",
  description: "TileVille privacy policy and data handling practices",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">Privacy Policy</h1>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <p className="italic text-gray-700">Last Updated: March 31, 2025</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p className="mb-4">
            Welcome to TileVille. We respect your privacy and are committed to
            protecting your personal data. This privacy policy explains how we
            collect, use, and safeguard your information when you use our
            service.
          </p>
          <p>
            TileVille is a decentralized application (dApp) built on the Mina
            Protocol blockchain. Our service involves blockchain transactions,
            which are inherently public and transparent.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            2. Information We Collect
          </h2>

          <h3 className="mb-2 text-xl font-medium">2.1 Wallet Information</h3>
          <p className="mb-4">
            When you connect your wallet to TileVille, we collect your Mina
            Protocol wallet address. This information is necessary to facilitate
            transactions, authenticate your identity, and provide our services.
          </p>

          <h3 className="mb-2 text-xl font-medium">2.2 Game Data</h3>
          <p className="mb-4">
            We collect and store information about your in-game activities,
            including but not limited to:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Game scores and results</li>
            <li>Competition participation</li>
            <li>PVP challenges</li>
            <li>NFT ownership</li>
            <li>Transaction history</li>
          </ul>

          <h3 className="mb-2 text-xl font-medium">2.3 Profile Information</h3>
          <p className="mb-4">
            If you create a profile, we collect the information you provide,
            such as:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Username</li>
            <li>Profile picture</li>
            <li>Social media handles (if provided)</li>
            <li>Email address (if provided)</li>
          </ul>

          <h3 className="mb-2 text-xl font-medium">
            2.4 Technical Information
          </h3>
          <p>
            We collect certain technical information when you use our service,
            including your IP address, browser type, device information, and
            usage data through analytics tools.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            3. How We Use Your Information
          </h2>

          <p className="mb-4">
            We use your information for the following purposes:
          </p>

          <ul className="mb-4 ml-6 list-disc">
            <li>To provide and maintain our service</li>
            <li>To process your transactions on the blockchain</li>
            <li>To authenticate your identity</li>
            <li>To maintain leaderboards and competition records</li>
            <li>
              To communicate with you about service updates, competitions, and
              features
            </li>
            <li>To prevent fraud and ensure security</li>
            <li>To improve our service based on usage patterns</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            4. Blockchain Transparency
          </h2>

          <p className="mb-4">
            As a blockchain application, certain information is inherently
            public. When you perform transactions on the Mina Protocol
            blockchain, the following information becomes publicly visible:
          </p>

          <ul className="mb-4 ml-6 list-disc">
            <li>Your wallet address</li>
            <li>
              Transaction details including amounts, timestamps, and transaction
              IDs
            </li>
            <li>Smart contract interactions</li>
            <li>NFT ownership</li>
          </ul>

          <p>
            Please note that blockchain transactions are immutable and cannot be
            deleted once recorded.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">5. Data Sharing</h2>

          <p className="mb-4">We may share your information with:</p>

          <ul className="mb-4 ml-6 list-disc">
            <li>Service providers who help us deliver our services</li>
            <li>Analytics providers to help us improve our service</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <p>We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">6. Data Security</h2>

          <p className="mb-4">
            We implement appropriate security measures to protect your personal
            information. However, no internet transmission is completely secure,
            and we cannot guarantee the security of your information.
          </p>

          <p>
            You are responsible for maintaining the security of your wallet
            credentials and private keys. Never share your private keys or
            recovery phrases with anyone, including TileVille team members.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>

          <p className="mb-4">
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>

          <ul className="mb-4 ml-6 list-disc">
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>
              Right to delete certain information (where possible, noting
              blockchain limitations)
            </li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>

          <p>
            To exercise these rights, please contact us at
            privacy@tileville.xyz.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">8. Childrens Privacy</h2>

          <p>
            Our service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13. If you believe we have collected information from a child under
            13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            9. Changes to This Privacy Policy
          </h2>

          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the Last Updated date. You are advised to review this
            privacy policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">10. Contact Us</h2>

          <p className="mb-4">
            If you have any questions about this privacy policy or our data
            practices, please contact us at:
          </p>

          <p>Email: privacy@tileville.xyz</p>
        </section>
      </div>

      <div className="mt-10 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Additional Resources</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/terms-of-service"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Terms of Service
          </Link>
          <Link
            href="/faq"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
