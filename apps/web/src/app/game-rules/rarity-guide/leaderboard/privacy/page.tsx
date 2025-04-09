export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-xl font-bold">1. Introduction</h2>
          <p>
            TileVille is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your information
            when you use our platform. By using TileVille, you consent to the
            data practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">2. Information We Collect</h2>
          <div className="space-y-3">
            <p>We may collect the following types of information:</p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>Wallet addresses and public blockchain information</li>
              <li>Username and profile information</li>
              <li>Game play data and statistics</li>
              <li>Communication data when you interact with our community</li>
              <li>
                Technical information such as device type and browser
                information
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">
            3. How We Use Your Information
          </h2>
          <div className="space-y-3">
            <p>We use your information for the following purposes:</p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>To provide and maintain our service</li>
              <li>
                To process transactions and verify ownership of digital assets
              </li>
              <li>To personalize your experience</li>
              <li>To improve our platform based on usage patterns</li>
              <li>To communicate with you about updates and features</li>
              <li>To prevent fraud and enforce our terms of service</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">4. Blockchain Data</h2>
          <p>
            TileVille operates on the Mina Protocol blockchain. By nature,
            blockchain transactions are immutable and public. While we do not
            control this data, you should be aware that transaction history and
            wallet addresses are publicly accessible on the blockchain.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">
            5. Data Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Service providers who assist in operating our platform</li>
            <li>Legal authorities when required by law</li>
            <li>
              Third parties in connection with a merger, acquisition, or asset
              sale
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data
            against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">7. Your Data Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your
            personal data, including:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Right to access your data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete certain data</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">8. Childrens Privacy</h2>
          <p>
            TileVille is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">9. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the effective date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at privacy@tileville.xyz.
          </p>
        </section>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600">Last updated: April 9, 2025</p>
      </div>
    </div>
  );
}
