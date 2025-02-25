/**
 * Constants for consistent styling and content
 */
const THEME = {
  container: "mt-6 rounded-lg bg-[#1E2321]/95 p-6 shadow-xl backdrop-blur-lg",
  heading: "mb-4 text-2xl font-bold text-[#C2FF00]",
  intro: "text-base font-medium text-[#E4FFB6]",
  contentBox: "space-y-4 rounded-md bg-[#2A352C]/90 p-5",
  paragraph: "text-[#C5E4A8]",
  tagContainer: "mt-4 flex flex-wrap gap-2",
  tag: "rounded-md bg-[#3B4B3E] px-4 py-1.5 text-sm font-medium text-[#A2FF00]",
};

const CONTENT = {
  heading: "ZKgod: The Anonymity Revolution",
  intro:
    "Welcome to the vanguard of digital freedom - where zero-knowledge technology meets revolutionary art in the most disruptive way possible.",
  paragraphs: [
    "In an era where privacy is a luxury and true freedom lies in anonymity, ZKgod emerges as the beacon of change. Each NFT in this collection is more than just digital art - it's your key to the future of privacy-first innovation.",
    "As a ZKgod holder, you're not just collecting art - you're joining an elite movement that's redefining digital privacy. Your NFT serves as your gateway to exclusive Silent Airdrops and puts you at the forefront of the zero-knowledge revolution.",
  ],
  tags: ["Anonymity", "Privacy", "Zero-Knowledge", "Revolution"],
};

/**
 * ZkGodCollectionDescription component displays information about the ZKgod collection
 */
export const ZkGodCollectionDescription = () => {
  return (
    <div className={THEME.container}>
      <h3 className={THEME.heading}>{CONTENT.heading}</h3>

      <div className="space-y-4">
        <p className={THEME.intro}>{CONTENT.intro}</p>

        <div className={THEME.contentBox}>
          {CONTENT.paragraphs.map((paragraph, index) => (
            <p key={index} className={THEME.paragraph}>
              {paragraph}
            </p>
          ))}

          <div className={THEME.tagContainer}>
            {CONTENT.tags.map((tag) => (
              <span key={tag} className={THEME.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
