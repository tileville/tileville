import { FEEDBACK_FORM_URL, GAME_ROADMAP_URL, GITHUB_URL } from "@/constants";
import { FaceIcon, StarFilledIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 right-2 flex items-center gap-4 p-2 backdrop-blur-2xl">
      <a
        href={GAME_ROADMAP_URL}
        target="_blank"
        className="flex items-center gap-2 text-xs underline"
      >
        <span>Game roadmap</span>
      </a>

      <a
        href={GITHUB_URL}
        target="_blank"
        className="flex items-center gap-1 text-xs underline"
      >
        <span>Star us on github</span>
        <StarFilledIcon />
      </a>

      <a
        href={FEEDBACK_FORM_URL}
        target="_blank"
        className="flex items-center gap-1 text-xs underline"
      >
        <span>Share Feedback</span>
        <FaceIcon />
      </a>
    </footer>
  );
};
