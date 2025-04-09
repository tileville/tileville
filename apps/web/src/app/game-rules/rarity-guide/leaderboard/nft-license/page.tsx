export default function NFTLicense() {
  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        TileVille NFT License Agreement
      </h1>

      <div className="mb-8 rounded-lg border border-primary/20 bg-primary/10 p-6">
        <p className="italic">
          This NFT License Agreement outlines the rights and restrictions that
          apply to all TileVille non-fungible tokens (NFTs). By purchasing,
          owning, or using a TileVille NFT, you agree to the terms set forth in
          this document.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-xl font-bold">1. Ownership Rights</h2>
          <p>
            When you purchase a TileVille NFT, you own the specific digital
            asset that the NFT represents. This ownership is recorded on the
            Mina Protocol blockchain and grants you certain rights as outlined
            in this license.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">2. Gameplay Benefits</h2>
          <p>
            TileVille NFTs provide functional utility within the TileVille
            gaming ecosystem. Each NFT grants specific gameplay benefits based
            on its traits and attributes. These benefits may include:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>Enhanced city-building capabilities</li>
            <li>Special abilities that affect gameplay</li>
            <li>Unique visual elements for your cities</li>
            <li>Access to exclusive game modes or features</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">3. Personal Use Rights</h2>
          <p>As an owner of a TileVille NFT, you have the right to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>Display the NFT for personal, non-commercial purposes</li>
            <li>Use the NFT within the TileVille platform</li>
            <li>Sell, trade, or transfer the NFT to another person</li>
            <li>
              Use the image of your NFT as a profile picture on social media
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">
            4. Commercial Use Restrictions
          </h2>
          <p>
            Without explicit written permission from TileVille, you may not:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>
              Use the NFT for commercial purposes that generate revenue
              exceeding $5,000 per year
            </li>
            <li>Create merchandise featuring the NFT for sale</li>
            <li>Modify the original artwork of the NFT</li>
            <li>
              Use the NFT in connection with hate speech, illegal activities, or
              scams
            </li>
            <li>
              Use the NFT in ways that infringe on TileVilles or third-party
              intellectual property rights
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">5. Intellectual Property</h2>
          <p>
            TileVille retains all intellectual property rights to the artwork,
            designs, and game mechanics associated with the NFTs. Your purchase
            of an NFT does not transfer copyright or other intellectual property
            rights to you, except for the limited license expressly stated in
            this agreement.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">6. Transferability</h2>
          <p>
            You may sell, transfer, or trade your TileVille NFT without
            permission from TileVille. When you transfer an NFT, the new owner
            receives all the rights granted by this license.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">
            7. Updates and Modifications
          </h2>
          <p>
            TileVille reserves the right to update or modify the gameplay
            benefits associated with NFTs to maintain game balance and improve
            the overall experience. We will make reasonable efforts to ensure
            that such changes do not substantially diminish the value or utility
            of existing NFTs.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">8. Termination</h2>
          <p>
            If you violate any terms of this license, TileVille may, at its
            discretion, terminate your rights to use the NFTs functional
            benefits within the TileVille platform. Your ownership of the NFT on
            the blockchain will not be affected.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">
            9. Disclaimer and Limitations
          </h2>
          <p>
            TileVille NFTs are provided as is without warranties of any kind.
            TileVille is not responsible for any fluctuations in value or issues
            with the underlying blockchain technology.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">10. Governing Law</h2>
          <p>
            This license shall be governed by and construed in accordance with
            the laws of the jurisdiction in which TileVille operates, without
            regard to conflict of law principles.
          </p>
        </section>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600">Last updated: April 9, 2025</p>
        <p className="mt-2 text-sm text-gray-600">
          For questions about this license, please contact legal@tileville.xyz
        </p>
      </div>
    </div>
  );
}
