import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useNetworkLayer } from "@/hooks/useNetworkLayer";
import { useState } from "react";
import { PrimaryButton } from "./PrimaryButton";
import Image from "next/image";

export default function ConnectButton() {
  const { signer = "", chain = {}, connect } = useNetworkLayer();

  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <>
      <div className="flex w-screen items-center gap-2 bg-red-300">
        {signer != null ? (
          <button className="items-centere bg-primary-30 flex gap-2 rounded-[15px] px-[15px] py-[3.5px]">
            <Image
              src="/logos/mina.png"
              alt="mina logo"
              className="h-4 w-4 invert"
              width={40}
              height={40}
            />
            <span>{chain.chainName}</span>
          </button>
        ) : null}
        <DropdownMenu.Root>
          {signer === null ? (
            <PrimaryButton
              key={2}
              onFocus={() => handleFocus(1)}
              text="Connect"
              size="sm"
              autoFocus={1 === focusedButtonIndex}
              onClickHandler={connect}
            />
          ) : (
            <DropdownMenu.Trigger>
              <button
                // onClick={onClickHandler ? onClickHandler : handleClick}
                // ref={buttonRef}
                // onMouseEnter={handleMouseEnter}
                className="focus-visible-bg-primary-30 focus-bg-primary-30 hover-bg-primary-30 bg-primary-30 flex cursor-pointer items-center justify-center gap-2 rounded-[15px] border-2 border-2 border-transparent bg-opacity-30 px-[15px] py-[3.5px] font-mono leading-none text-white outline-none hover:border-primary hover:shadow-[0_0_8px_hsl(var(--primary))] hover:shadow-[0_0_8px_hsl(var(--primary))] focus:border-primary focus:shadow-[0_0_8px_hsl(var(--primary))] focus-visible:shadow-[0_0_8px_hsl(var(--primary))]"
              >
                {/* {icon} */}
                {/* {text} */}
                Connect
              </button>
            </DropdownMenu.Trigger>
          )}
          <DropdownMenu.Content className="gradient-bg !bg-black">
            <DropdownMenu.Item className="!bg-transparent">
              {/* <Button
                onClick={() => {
                  console.log("disconnect");
                }}
                variant="outline"
                size="3"
              >
                Disconnect
              </Button> */}

              <PrimaryButton
                key={2}
                onFocus={() => handleFocus(1)}
                text={"Disconnect"}
                size="sm"
                autoFocus={1 === focusedButtonIndex}
              />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
}
