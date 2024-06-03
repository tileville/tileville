import { CrossCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function ProfileSideBar({
  handleToggle,
}: {
  handleToggle: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="p-4 pt-14">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <div className="h-30 rounded-md">
          <Image
            src="/img/NFT.avif"
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      </div>

      <button className="absolute left-3 top-3" onClick={handleToggle}>
        <CrossCircledIcon width={24} height={24} />
      </button>
    </div>
  );
}
