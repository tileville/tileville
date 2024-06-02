"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import ConnectButton from "./ConnectButton";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";
import { MediaPlayer } from "./MediaPlayer";

export const NavBar = () => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 mb-6 px-4 pt-2 text-white">
      <div className="flex w-full items-start justify-between">
        <div>
          <PrimaryButton
            key={1}
            onFocus={() => handleFocus(1)}
            size="sm"
            icon={<ChevronLeftIcon width={30} height={30} />}
            autoFocus={1 === focusedButtonIndex}
            href={"/main-menu"}
            className={`rounded-3xl !border !border-primary !px-6`}
          />
        </div>

        <div>
          <ConnectButton />
          <MediaPlayer />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="3" radius="none">
      <Link href={to} className="">
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
