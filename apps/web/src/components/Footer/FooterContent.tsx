import { FEEDBACK_FORM_URL, GAME_ROADMAP_URL, GITHUB_URL } from "@/constants";
import { FaceIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    className="inline-flex items-center gap-2 text-xs underline transition-opacity hover:opacity-80"
  >
    {children}
  </a>
);

export const FooterContent = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-1 p-2">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <FooterLink href={GAME_ROADMAP_URL}>Game roadmap</FooterLink>
        <FooterLink href={GITHUB_URL}>
          Star us on GitHub <StarFilledIcon className="h-4 w-4" />
        </FooterLink>
        <FooterLink href={FEEDBACK_FORM_URL}>
          Share Feedback <FaceIcon className="h-4 w-4" />
        </FooterLink>
      </div>

      <div className="text-right text-xs">
        TileVille was inspired by Six Sided Streets made by{" "}
        <a
          href="https://csklimowski.itch.io/"
          target="_blank"
          className="underline transition-opacity hover:opacity-80"
        >
          Chris Klimowski
        </a>
      </div>
    </div>
  );
};
