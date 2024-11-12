import { FEEDBACK_FORM_URL, GAME_ROADMAP_URL, GITHUB_URL } from "@/constants";
import { FaceIcon, StarFilledIcon } from "@radix-ui/react-icons";

export const FooterContent = () => {
  return (
    <div className="flex flex-col gap-1 p-2 max-w-screen-xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 justify-end">
        <a
          href={GAME_ROADMAP_URL}
          target="_blank"
          className="text-xs hover:opacity-80 underline inline-flex items-center gap-2 transition-opacity"
        >
          Game roadmap
        </a>

        <a
          href={GITHUB_URL}
          target="_blank"
          className="text-xs hover:opacity-80 underline inline-flex items-center gap-2 transition-opacity"
        >
          Star us on github
          <StarFilledIcon className="w-4 h-4" />
        </a>

        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          className="text-xs hover:opacity-80 underline inline-flex items-center gap-2 transition-opacity"
        >
          Share Feedback
          <FaceIcon className="w-4 h-4" />
        </a>
      </div>

      <div className="text-xs text-right">
        TileVille was inspired by Six Sided Streets made by{" "}
        <a
          href="https://csklimowski.itch.io/"
          target="_blank"
          className="underline hover:opacity-80 transition-opacity"
        >
          Chris Klimowski
        </a>
      </div>
    </div>
  );
};
