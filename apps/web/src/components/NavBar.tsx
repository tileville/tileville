"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import ConnectButton from "./ConnectButton";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import {
  GITHUB_URL,
  GAME_TUTORIAL_VIDEO_URL,
  ZKIGNITE_PROPOSAL,
} from "@/constants";
import { PrimaryButton } from "./PrimaryButton";
import { useEffect, useRef, useState } from "react";

export const NavBar = () => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <nav className="mb-6 px-4 pt-2 text-white">
      <div className="flex w-full items-center justify-between">
        <PrimaryButton
          key={1}
          onFocus={() => handleFocus(1)}
          // text={""}
          size="sm"
          icon={<ChevronLeftIcon />}
          autoFocus={1 === focusedButtonIndex}
          href={"/main-menu"}
        />
        <ConnectButton />
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="3" radius="none">
      <Link to={to} className="">
        {label}
      </Link>
    </Button>
  );
};

export const AnchorNavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="4" radius="none">
      <a href={to} target="_blank">
        {label}
      </a>
    </Button>
  );
};
