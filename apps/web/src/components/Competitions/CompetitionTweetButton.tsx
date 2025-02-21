export const CompetitionTweetButton = ({
  tweetContent,
}: {
  tweetContent: string;
}) => {
  return (
    <button
      onClick={() => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetContent
          )}`,
          "_blank",
          "noopener,noreferrer"
        );
      }}
      className="competition-tweet-btn ms-auto flex cursor-pointer items-center rounded-full bg-primary px-2 py-1 font-medium text-white"
    >
      <i className="twitterIcon h-3 w-3"></i>
      <span className="label ms-1 whitespace-nowrap font-medium" id="l">
        Tweet about competition
      </span>
    </button>
  );
};
