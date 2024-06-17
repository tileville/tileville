import { FEEDBACK_FORM_URL } from "@/constants";
import { FaceIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <footer className="fixed bottom-2 right-2 flex space-x-2">
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
      <a
        href={FEEDBACK_FORM_URL}
        target="_blank"
        className="flex items-center gap-2 text-xs underline"
      >
        <span>Share Feedback</span>
        <FaceIcon />
      </a>
    </footer>
  );
};
