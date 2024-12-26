export const CollectionDescription = () => {
  return (
    <div className="mt-6 rounded-lg bg-[#1E2321]/95 p-6 shadow-xl backdrop-blur-lg">
      <h3 className="mb-4 text-2xl font-bold text-[#C2FF00]">
        ZKgod: The Anonymity Revolution
      </h3>

      <div className="space-y-4">
        <p className="text-base font-medium text-[#E4FFB6]">
          Welcome to the vanguard of digital freedom - where zero-knowledge
          technology meets revolutionary art in the most disruptive way
          possible.
        </p>

        <div className="space-y-4 rounded-md bg-[#2A352C]/90 p-5">
          <p className="text-[#C5E4A8]">
            In an era where privacy is a luxury and true freedom lies in
            anonymity, ZKgod emerges as the beacon of change. Each NFT in this
            collection is more than just digital art - it's your key to the
            future of privacy-first innovation.
          </p>

          <p className="text-[#C5E4A8]">
            As a ZKgod holder, you're not just collecting art - you're joining
            an elite movement that's redefining digital privacy. Your NFT serves
            as your gateway to exclusive Silent Airdrops and puts you at the
            forefront of the zero-knowledge revolution.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Anonymity", "Privacy", "Zero-Knowledge", "Revolution"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[#3B4B3E] px-4 py-1.5 text-sm font-medium text-[#A2FF00]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
