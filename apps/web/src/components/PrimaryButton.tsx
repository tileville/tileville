"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const PrimaryButton = ({
  onFocus,
  text,
  autoFocus,
  href,
  size,
  icon,
  targetBlank,
  onClickHandler,
  className,
}: {
  onFocus: any;
  text: string;
  autoFocus: any;
  href: string;
  size: string;
  icon: string;
  targetBlank: boolean;
  onClickHandler: any;
  className: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickSound] = useState(new Audio("/medias/click.mp3"));

  const [hoverSound] = useState(new Audio("/medias/hover.wav"));

  const handleClick = () => {
    clickSound.play();
  };

  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleMouseEnter = () => {
    console.log(hoverSound.currentTime);
    hoverSound.currentTime = 0;
    console.log(hoverSound.currentTime);
    hoverSound.play();
    onFocus();
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  if (!href) {
    return (
      <button
        onClick={onClickHandler ? onClickHandler : handleClick}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        className="focus-visible-bg-primary-30 focus-bg-primary-30 bg-primary-30 flex cursor-pointer items-center justify-center gap-2 rounded-[15px] border-2 border-transparent bg-opacity-30 px-[15px] py-[3.5px] font-mono leading-none text-primary outline-none hover:shadow-[0_0_8px_hsl(var(--primary))] focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus-visible:shadow-[0_0_8px_hsl(var(--primary))]"
      >
        {icon}
        {text}
      </button>
    );
  }

  if (size === "sm") {
    return (
      <Link
        onClick={handleClick}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        href={`${href}`}
        className={`${className} focus-visible-bg-primary-30 focus-bg-primary-30 bg-primary-30 flex cursor-pointer items-center justify-center gap-2 rounded-[15px] border-2 border-transparent bg-opacity-30 px-[15px] py-[3.5px] font-mono leading-none text-primary outline-none hover:shadow-[0_0_8px_hsl(var(--primary))] focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus-visible:shadow-[0_0_8px_hsl(var(--primary))]`}
        // className="focus-visible-bg-primary-30 focus-bg-primary-30 bg-primary-30 flex cursor-pointer items-center justify-center gap-2 rounded-[15px] border-2 border-transparent bg-opacity-30 px-[15px] py-[3.5px] font-mono leading-none text-primary outline-none hover:shadow-[0_0_8px_hsl(var(--primary))] focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus-visible:shadow-[0_0_8px_hsl(var(--primary))]"
      >
        {icon}
        {text}
      </Link>
    );
  }

  return (
    <Link
      onClick={handleClick}
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      href={href ? `${href}` : ""}
      className="focus-visible-bg-primary-30 focus-bg-primary-30 border-2 border-transparent p-[5px] text-left font-semibold uppercase text-primary outline-none focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus-visible:border-primary focus-visible:shadow-[0_0_8px_hsl(var(--primary))]"
    >
      {text}
    </Link>
  );
};
