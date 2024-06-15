"use client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "react-use-audio-player";

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
  text?: string;
  autoFocus: any;
  href?: string;
  size?: string;
  icon?: React.ReactNode;
  targetBlank?: boolean;
  onClickHandler?: any;
  className?: string;
}) => {
  const buttonRef = useRef<any>(null);

  const { load: loadClickSound, play: playClickSound } = useAudioPlayer();
  const {
    load: loadHoverSound,
    play: playHoverSound,
    seek: setHoverSoundSeek,
  } = useAudioPlayer();

  useEffect(() => {
    loadClickSound("/medias/click.mp3", { autoplay: false, loop: false });
    loadHoverSound("/medias/hover.wav", { autoplay: false, loop: false });
  }, []);

  const handleClick = () => {
    playClickSound();
  };

  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleMouseEnter = () => {
    setHoverSoundSeek(0);
    playHoverSound();
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
        className={clsx(
          className,
          "focus-visible-bg-primary-30 focus-bg-primary-30 bg-primary-30 flex cursor-pointer items-center justify-center gap-2 rounded-[15px] border-2 border-transparent bg-opacity-30 px-[15px] py-[3.5px] font-mono leading-none text-primary outline-none hover:shadow-[0_0_8px_hsl(var(--primary))] focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus-visible:shadow-[0_0_8px_hsl(var(--primary))]"
        )}
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
      target={`${targetBlank ? "_blank" : "_self"}`}
      className="focus-visible-bg-primary-30 focus-bg-primary-30 p-[5px] text-left font-semibold uppercase text-primary outline-none outline-offset-0 focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus:outline-1 focus:outline-primary focus-visible:border-primary focus-visible:shadow-[0_0_8px_hsl(var(--primary))]"
    >
      {text}
    </Link>
  );
};
