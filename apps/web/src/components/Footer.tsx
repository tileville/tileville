import { FEEDBACK_FORM_URL, GAME_ROADMAP_URL, GITHUB_URL } from "@/constants";
import { FaceIcon, StarFilledIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 right-0  w-full rounded-md ps-2 pt-2 backdrop-blur-md">
      <div className="flex items-center justify-end gap-4 p-2">
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
      </div>

      <div className="text-right text-sm">
        <span>
          TileVille was inspired by Six Sided Streets made by{" "}
          <a
            target="_blank"
            href="https://csklimowski.itch.io/"
            className="underline"
          >
            Chris Klimowski
          </a>
        </span>
      </div>
    </footer>
  );
};
