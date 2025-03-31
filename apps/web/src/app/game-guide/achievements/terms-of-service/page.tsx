import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Terms of Service",
  description: "Terms and conditions for using the TileVille platform",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">Terms of Service</h1>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <p className="italic text-gray-700">Last Updated: March 31, 2025</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using TileVille, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            2. Description of Service
          </h2>
          <p className="mb-4">
            TileVille is a decentralized application (dApp) built on the Mina
            Protocol blockchain that allows users to participate in
            city-building gameplay, competitions, and NFT transactions. The
            service includes but is not limited to:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>City-building gameplay</li>
            <li>Competitions and tournaments</li>
            <li>Player vs Player challenges</li>
            <li>NFT minting, trading, and collection</li>
            <li>Community engagement features</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            3. Blockchain & Cryptocurrency
          </h2>
          <p className="mb-4">
            TileVille operates on the Mina Protocol blockchain and uses
            cryptocurrency (MINA) for transactions. You acknowledge that:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Blockchain transactions are irreversible once confirmed</li>
            <li>
              You are solely responsible for managing your cryptocurrency wallet
              and private keys
            </li>
            <li>
              Cryptocurrency values can be volatile and may fluctuate
              significantly
            </li>
            <li>
              Transaction fees (gas fees) are required for blockchain operations
              and are not controlled by TileVille
            </li>
            <li>
              You are responsible for ensuring you have sufficient funds to
              complete transactions
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">4. User Accounts</h2>
          <p className="mb-4">
            To access certain features of the Service, you must connect your
            cryptocurrency wallet. You are responsible for:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Maintaining the security of your wallet</li>
            <li>All activities that occur under your wallet address</li>
            <li>Providing accurate profile information</li>
            <li>
              Notifying us immediately of any unauthorized use of your account
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            5. NFTs and Digital Assets
          </h2>
          <p className="mb-4">
            TileVille features non-fungible tokens (NFTs) that represent digital
            assets within the game. By purchasing or acquiring NFTs, you:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>
              Receive ownership rights to the NFT as defined by the smart
              contract
            </li>
            <li>
              Acknowledge that NFT ownership does not grant you any intellectual
              property rights to the underlying art, designs, or game elements
            </li>
            <li>
              Understand that NFT values can fluctuate and we make no guarantees
              regarding their future value
            </li>
            <li>
              Accept that NFT functionality is dependent on the continued
              operation of the blockchain and our platform
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">6. User Conduct</h2>
          <p className="mb-4">When using TileVille, you agree not to:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Use the service for any illegal purpose</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>
              Use bots, scripts, or automated methods to interact with the
              service
            </li>
            <li>Attempt to exploit bugs or vulnerabilities in the system</li>
            <li>Engage in market manipulation or fraudulent activities</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Interfere with the proper functioning of the service</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            7. Competitions and Rewards
          </h2>
          <p className="mb-4">
            TileVille offers competitions and challenges with potential rewards.
            Regarding these:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>
              We reserve the right to modify competition parameters and reward
              structures
            </li>
            <li>Participation may require entry fees in cryptocurrency</li>
            <li>
              Rewards distribution is subject to verification and anti-fraud
              measures
            </li>
            <li>
              You are responsible for any taxes applicable to rewards received
            </li>
            <li>
              We reserve the right to disqualify users suspected of cheating or
              violating competition rules
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            8. Intellectual Property
          </h2>
          <p className="mb-4">
            All content included in the service, including but not limited to
            text, graphics, logos, icons, images, audio clips, digital
            downloads, and software, is the property of TileVille or its content
            suppliers and is protected by international copyright, trademark,
            and other intellectual property laws.
          </p>
          <p>
            The compilation of all content on the Service is the exclusive
            property of TileVille and is protected by international copyright
            laws.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            9. Disclaimer of Warranties
          </h2>
          <p className="mb-4">
            The service is provided on an as is and as available basis.
            TileVille makes no warranties, expressed or implied, and hereby
            disclaims all warranties, including without limitation:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>
              Warranties of merchantability, fitness for a particular purpose,
              or non-infringement
            </li>
            <li>That the service will be uninterrupted or error-free</li>
            <li>That defects will be corrected</li>
            <li>
              That the service or server is free of viruses or other harmful
              components
            </li>
            <li>
              Regarding the reliability, accuracy, or completeness of any
              transactions, cryptocurrency values, or NFT values
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            10. Limitation of Liability
          </h2>
          <p className="mb-4">
            TileVille shall not be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages resulting from:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Your use or inability to use the service</li>
            <li>
              Unauthorized access to or alteration of your transmissions or data
            </li>
            <li>Statements or conduct of any third party on the service</li>
            <li>Blockchain transaction failures or delays</li>
            <li>Loss of cryptocurrency or digital assets</li>
            <li>Fluctuations in cryptocurrency or NFT values</li>
            <li>Any other matter relating to the service</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless TileVille, its
            officers, directors, employees, agents, and third parties from and
            against all losses, expenses, damages, and costs, including
            reasonable attorneys fees, resulting from any violation of these
            Terms or any activity related to your account.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            12. Modifications to Service
          </h2>
          <p>
            TileVille reserves the right to modify or discontinue, temporarily
            or permanently, the service with or without notice. We shall not be
            liable to you or any third party for any modification, suspension,
            or discontinuance of the service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">13. Changes to Terms</h2>
          <p>
            TileVille reserves the right to update or change these Terms at any
            time. We will provide notice of significant changes by posting the
            new Terms on this page and updating the Last Updated date. Your
            continued use of the Service after such modifications will
            constitute your acknowledgment of the modified Terms and agreement
            to abide by them.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which TileVille is registered,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            15. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at
            legal@tileville.xyz.
          </p>
        </section>
      </div>

      <div className="mt-10 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Additional Resources</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/privacy-policy"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Privacy Policy
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
