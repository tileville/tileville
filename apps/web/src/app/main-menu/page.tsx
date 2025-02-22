"use client";
import { useState, useEffect } from "react";
import LandingBackground from "@/components/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";
import { NAVIGATION_MENU_ITEMS } from "@/constants";
import { useNetworkStore } from "@/lib/stores/network";
import { useUsername } from "@/db/react-query-hooks";

export default function MainMenu() {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);
  const networkStore = useNetworkStore();
  const { data: username } = useUsername(networkStore?.address);
  const [navigationItems, setNavigationItems] = useState(NAVIGATION_MENU_ITEMS);

  useEffect(() => {
    if (networkStore.address) {
      setNavigationItems(
        NAVIGATION_MENU_ITEMS.map((item) => {
          if (item.href === "/profile") {
            const identifier = username || networkStore.address;
            return {
              ...item,
              href: `u/${identifier}`,
            };
          }
          return item;
        })
      );
    }
  }, [username, networkStore.address]);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center pt-20"
      tabIndex={0}
    >
      <LandingBackground />
      <div className="z-10 flex w-full flex-col items-center justify-center gap-8 px-3">
        <div className="slideAnimOnChilds mx-auto flex w-full max-w-[500px] cursor-pointer flex-col gap-[10px] text-xl uppercase text-white">
          {navigationItems.map((item) => (
            <PrimaryButton
              key={item.key}
              onFocus={() => handleFocus(item.key)}
              text={item.name}
              autoFocus={item.key === focusedButtonIndex}
              href={item.href}
              targetBlank={item.targetBlank}
              onClickHandler={undefined}
              className="border border-primary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
