import { PRIMARY_BUTTON_STYLES } from "@/constants";
import { UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type UserListItemType = {
  avatar_url: string;
  username: string;
  handleFollow: () => void;
  handleUnfollow: () => void;
  isLoading: boolean;
  currentWalletAddress: string;
  userWalletAddress: string;
  isFollowing: boolean;
};

export const UserListItem = ({
  avatar_url,
  username,
  handleFollow,
  handleUnfollow,
  isLoading,
  isFollowing,
}: UserListItemType) => {
  return (
    <div key={username} className="flex items-center gap-4">
      <div>
        <div className="h-[55px] w-[55px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
          <Image
            src={avatar_url}
            width={200}
            height={200}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      <div>{username}</div>

      <div className="ms-auto">
        {isFollowing ? (
          <button
            className={`${PRIMARY_BUTTON_STYLES} relative min-w-[128px]`}
            onClick={handleUnfollow}
            disabled={isLoading}
          >
            Remove
            {isLoading && (
              <span className="absolute right-5 top-1/2 -translate-y-1/2">
                <UpdateIcon className="animate-spin" />
              </span>
            )}
          </button>
        ) : (
          <button
            className={`${PRIMARY_BUTTON_STYLES} relative min-w-[128px]`}
            onClick={handleFollow}
            disabled={isLoading}
          >
            Follow
            {isLoading && (
              <span className="absolute right-5 top-1/2 -translate-y-1/2">
                <UpdateIcon className="animate-spin" />
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
