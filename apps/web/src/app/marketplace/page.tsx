"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import { DropdownMenu } from "@radix-ui/themes";

export default function Marketplace() {
  const options = [
    {
      text: "Price: Low to High",
      id: 0,
    },

    {
      text: "Price: High to Low",
      id: 1,
    },

    {
      text: "Recently Listed",
      id: 2,
    },

    {
      text: "Common to Rare",
      id: 3,
    },

    {
      text: "Rare to Common",
      id: 4,
    },
  ];

  const cardsData = [
    {
      imgURl: "/img/NFT.avif",
      id: 0,
    },
    {
      imgURl: "/img/NFT.avif",
      id: 1,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },

    {
      imgURl: "/img/NFT.avif",
      id: 2,
    },
  ];
  const [selectedItem, setSelectedItem] = useState<string>(options[3].text);

  return (
    <div className="p-4 pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex gap-3">
          <ul className="grid w-fit grid-cols-3">
            <li>
              <button className="flex h-10 w-10 items-center justify-center rounded-l-md bg-primary hover:opacity-80">
                <Image
                  src="/icons/gridFour.svg"
                  alt="grid"
                  width="20"
                  height="20"
                />
              </button>
            </li>
            <li>
              <button className="bg-primary-30 flex h-10 w-10 items-center justify-center hover:opacity-80">
                <Image
                  src="/icons/gridEight.svg"
                  alt="grid"
                  width="20"
                  height="20"
                />
              </button>
            </li>
            <li>
              <button className="bg-primary-30 flex h-10 w-10 items-center justify-center rounded-r-md hover:opacity-80">
                <Image
                  src="/icons/listThree.svg"
                  alt="grid"
                  width="20"
                  height="20"
                />
              </button>
            </li>
          </ul>

          <div className="relative flex-1">
            <span className="text-primary-50 absolute left-3 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon width={20} height={20} />
            </span>
            <input
              type="text"
              className="border-primary-30 h-full w-full rounded-md border bg-transparent pl-10 pr-2 font-medium outline-none placeholder:text-primary/30"
              placeholder="Search items"
            />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="border-primary-30 flex min-w-[190px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
                <span>{selectedItem}</span>
                <span>
                  <Image
                    src="icons/topBottomArrows.svg"
                    width={24}
                    height={24}
                    alt="arrows"
                  />
                </span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-[190px] !bg-transparent backdrop-blur-2xl">
              {options.map((option, id) => {
                return (
                  <DropdownMenu.Item
                    key={option.id}
                    onClick={() => {
                      setSelectedItem(options[id].text);
                    }}
                    className="hover:bg-primary"
                  >
                    {option.text}
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <div className="grid grid-cols-6 gap-4 text-lg">
          {cardsData.map((card) => {
            return (
              <div
                className="border-primary-30 group/item overflow-hidden rounded-md"
                key={card.id}
              >
                <div className="w-full overflow-hidden">
                  <Image
                    className="w-full transition-all group-hover/item:scale-110"
                    width="100"
                    height="200"
                    alt="NFT Image"
                    src={card.imgURl}
                  />
                </div>

                <div className="px-2 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">#4597</p>
                    <div className="rounded-md bg-primary px-3 py-[2px] text-white">
                      3888
                    </div>
                  </div>

                  <div className="my-1 font-semibold">
                    &#60;0.0001 <span className="text-primary-50"> MINA</span>
                  </div>
                </div>

                <div>
                  <button className="w-full bg-primary/30 p-4 font-semibold text-white transition-colors hover:bg-primary">
                    Connect Wallet
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
