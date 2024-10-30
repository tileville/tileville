import { copyToClipBoard, formatAddress } from "@/lib/helpers";
import { CopyIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link"

const BADGE_BASE_CLASSES =
  "flex items-center justify-center gap-1 whitespace-nowrap rounded-[5px] bg-primary/20 px-1 py-[1px] text-[10px] text-[#445137";

type ProfileBasicInfoType = {
  avatar_url: string | undefined
  username: string 
  fullName: string
  walletAddress: string
  followersCount: number
  followingCount: number
  discordUsername: string | null
  telegramUsername: string | null
  twitterUsername: string | null
} 

export const ProfileBasicInfo = ({
avatar_url , username , fullName , walletAddress , followersCount , followingCount , discordUsername ,telegramUsername  , twitterUsername
} : ProfileBasicInfoType) => {

  console.log("wallet address" , walletAddress)
  return (
    <div className="h-full w-full rounded-xl bg-primary/20 px-2 py-4 backdrop-blur-sm">
      <div className="mb-8 flex justify-end">
        <button className={BADGE_BASE_CLASSES}>
          <span>Edit Profile</span>
          <span className="text-white">
            <Pencil1Icon />
          </span>
        </button>
      </div>

      <div className="mb-4 flex items-start gap-3">

        {
          avatar_url &&

        <div className="h-[100px] w-[100px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
          <Image
            src={avatar_url}
            width={200}
            height={200}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        }


        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#224D08]">{fullName}</h2>

          <div className="flex items-center gap-3">
            <div className={BADGE_BASE_CLASSES}>
            <span>{formatAddress(walletAddress)}</span>
              <button
                onClick={() =>
                  copyToClipBoard({
                    toCopyContent: `${walletAddress}`,
                    copiedType: "Wallet Address",
                  })
                }
              >
                <CopyIcon width={12} height={12} />
              </button>
            </div>

            {/* //TODO: I think we will not show balance in the user public profile we are not saving it in db  */}
            {/* <div className={BADGE_BASE_CLASSES}>
              <span>
                Balance :<span className="text-[#010201]">200 MINA</span>
              </span>
            </div> */}
          </div>

          <div className="flex items-center justify-between gap-3 text-xs">
            <span>
              <span className="mr-1 text-base font-bold text-black">{followersCount}</span>
              followers
            </span>

            <span>
              <span className="mr-1 text-base font-bold text-black">{followingCount}</span>
              following
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {
          discordUsername &&
          <Link href={`https://discord.com/users/${discordUsername}`}>
          <Image
            src="/icons/discord.svg"
            width={20}
            height={20}
            alt="discord"
          />
        </Link>
        }
       
       {
        telegramUsername &&
        <Link href={`https://t.me/${telegramUsername.replace('@', '')}`}>
          <Image
            src="/icons/telegram.svg"
            width={20}
            height={20}
            alt="telegram"
          />
        </Link>
        }

      {
        twitterUsername &&
        <Link href={ `https://twitter.com/${twitterUsername.replace('@', '')}`}>
          <Image src="/icons/x.svg" width={20} height={20} alt="x" />
        </Link>
      }

      </div>
    </div>
  );
};
