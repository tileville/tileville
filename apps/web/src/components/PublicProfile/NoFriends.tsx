import Image from "next/image";

export const NoFriends = ({}) => {
  return (
    <div className="flex items-center justify-between text-center">
      <div>
        <Image
          src="/img/avatars/friends.png"
          width={200}
          height={150}
          alt="friends"
        />
      </div>

      <div>
        <h3>
          User don&apos;t have any <br /> friends
        </h3>
      </div>
    </div>
  );
};
