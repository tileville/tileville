import Image from "next/image";

type UserListItemType = {
  avatar_url: string;
  username: string;
  handleFollow: () => void;
  isLoading: boolean;
  currentWalletAddress: string;
  userWalletAddress: string;
  isFollowing: boolean;
};

export const UserListItem = ({
  avatar_url,
  username,
  handleFollow,
  isLoading,
  isFollowing,
}: UserListItemType) => {
  //TODO: code to check if the current user is already following the user or not

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
          <button className="border border-black p-2">Remove</button>
        ) : (
          <button className="border border-black p-2" onClick={handleFollow}>
            Follow
            {isLoading && "...."}
          </button>
        )}
      </div>
    </div>
  );
};
