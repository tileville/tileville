import React from "react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <div className="p-4 pb-20 pt-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-primary md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Last Updated: March 15, 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            At TileVille, we respect your privacy and are committed to
            protecting your personal data. This Privacy Policy describes how we
            collect, use, and share information when you use our website and
            game application (the Service).
          </p>

          <p>
            By using the Service, you agree to the collection and use of
            information in accordance with this policy.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide</h3>
          <p>
            When you create a profile or interact with our Service, we may
            collect certain information that you provide, including:
          </p>
          <ul>
            <li>Username and profile information</li>
            <li>Email address (if provided)</li>
            <li>Social media usernames (if connected)</li>
            <li>Wallet address</li>
            <li>Game statistics and achievements</li>
          </ul>

          <h3>1.2 Information Collected Automatically</h3>
          <p>
            When you access or use our Service, we may automatically collect
            certain information, including:
          </p>
          <ul>
            <li>Device information (browser type, operating system, etc.)</li>
            <li>Usage data (pages visited, time spent, etc.)</li>
            <li>IP address</li>
            <li>Game interaction data</li>
            <li>Blockchain transaction data related to our Service</li>
          </ul>

          <h3>1.3 Public Blockchain Data</h3>
          <p>
            Please note that blockchain transactions are public by nature. When
            you interact with our smart contracts or make transactions related
            to our Service on the Mina blockchain, this information is publicly
            available and not considered private.
          </p>

          <h2>2. How We Use Your Information</h2>

          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul>
            <li>To provide, maintain, and improve our Service</li>
            <li>To create and manage your account</li>
            <li>To process transactions and distribute rewards</li>
            <li>
              To communicate with you about updates, competitions, and other
              information related to the Service
            </li>
            <li>To monitor and analyze usage patterns and trends</li>
            <li>
              To detect, prevent, and address technical issues and fraudulent
              activities
            </li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. How We Share Your Information</h2>

          <p>We may share your information in the following situations:</p>
          <ul>
            <li>
              <strong>Public Profiles:</strong> Information you include in your
              public profile will be visible to other users
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors and service providers who help us deliver the
              Service
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              if required by law or in response to valid requests by public
              authorities
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share information for
              other purposes with your consent
            </li>
          </ul>

          <p>We do not sell your personal information to third parties.</p>

          <h2>4. Blockchain Data and Wallet Information</h2>

          <p>
            TileVille is built on the Mina blockchain, which is a public and
            decentralized network. When you connect your wallet and interact
            with our Service:
          </p>
          <ul>
            <li>
              Your wallet address is visible on the blockchain and within our
              Service
            </li>
            <li>
              Transactions related to our game (e.g., competition entries, NFT
              minting, rewards) are recorded on the blockchain
            </li>
            <li>
              We never have access to your private keys or wallet seed phrases
            </li>
          </ul>

          <p>
            Please note that we cannot delete or modify information that exists
            on the blockchain.
          </p>

          <h2>5. Data Security</h2>

          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>

          <p>
            You are responsible for maintaining the security of your wallet and
            account credentials. We strongly recommend using secure passwords
            and enabling two-factor authentication where available.
          </p>

          <h2>6. Your Rights</h2>

          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul>
            <li>Right to access the personal information we hold about you</li>
            <li>Right to correct inaccurate or incomplete information</li>
            <li>Right to delete your personal information (where possible)</li>
            <li>
              Right to restrict or object to processing of your information
            </li>
            <li>Right to data portability</li>
          </ul>

          <p>
            Please note that some of these rights may be limited where we have
            compelling legitimate grounds to process your information or where
            information is stored on the blockchain and cannot be modified or
            deleted.
          </p>

          <h2>7. Children¯s Privacy</h2>

          <p>
            Our Service is not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children. If you
            are a parent or guardian and believe your child has provided us with
            personal information, please contact us.
          </p>

          <h2>8. Third-Party Services</h2>

          <p>
            Our Service may contain links to third-party websites or services
            that are not owned or controlled by TileVille. We have no control
            over and assume no responsibility for the content, privacy policies,
            or practices of any third-party websites or services.
          </p>

          <h2>9. Analytics and Tracking</h2>

          <p>
            We may use third-party analytics services (such as PostHog) to help
            us understand how users interact with our Service. These services
            may collect information about your use of our Service and may use
            cookies or similar technologies to track activity.
          </p>

          <p>
            You can opt out of certain tracking by adjusting your browser
            settings to refuse cookies or by using browser extensions designed
            to block trackers.
          </p>

          <h2>10. International Data Transfers</h2>

          <p>
            Your information may be transferred to and processed in countries
            other than the country in which you reside. These countries may have
            data protection laws that are different from the laws of your
            country.
          </p>

          <p>
            By using our Service, you consent to the transfer of your
            information to countries outside your country of residence.
          </p>

          <h2>11. Changes to This Privacy Policy</h2>

          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by postingthe new Privacy Policy on this page and
            updating the Last Updated date.
          </p>

          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>

          <h2>12. Contact Us</h2>

          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>

          <p>
            Email: privacy@tileville.game
            <br />
            Telegram:{" "}
            <a
              href="https://t.me/tilevillegame"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              @tilevillegame
            </a>
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/terms" className="text-primary hover:underline">
            View Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
