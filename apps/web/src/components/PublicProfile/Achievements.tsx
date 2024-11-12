import { Skeleton } from "@radix-ui/themes";
import Image from "next/image";

type AchievementsProps = {
  highestScore?: number;
  isPublicLoading: boolean;
};

const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    iconUrl: "/icons/badge.png",
    getHeading: (highestScore?: number) => highestScore?.toString() || "0",
    subHeading: "Highest score",
  },
  {
    id: 2,
    iconUrl: "/icons/coins.png",
    getHeading: () => "$100",
    subHeading: "Total Rewards",
  },
  {
    id: 3,
    iconUrl: "/icons/trophy.png",
    getHeading: () => "5",
    subHeading: "Total Wins",
  },
  {
    id: 4,
    iconUrl: "/icons/medal.png",
    getHeading: () => "Gold",
    subHeading: "Current league",
  },
  {
    id: 5,
    iconUrl: "/icons/game.png",
    getHeading: () => "23",
    subHeading: "Total games",
  },
  {
    id: 6,
    iconUrl: "/icons/star.png",
    getHeading: () => "10th",
    subHeading: "Rank",
  },
];

export const Achievements = ({
  highestScore,
  isPublicLoading,
}: AchievementsProps) => {
  return (
    <div className="h-full w-full text-black">
      <div className="grid h-full grid-cols-2 gap-3">
        {ACHIEVEMENTS_DATA.map((achievement) => {
          return (
            <div
              className="flex items-center gap-4 rounded-xl bg-primary/20 p-4 backdrop-blur-sm"
              key={achievement.id}
            >
              <div>
                <Image
                  src={achievement.iconUrl}
                  width="53"
                  height="53"
                  alt={achievement.iconUrl.slice(
                    7,
                    achievement.iconUrl.length - 4
                  )}
                  className="w-[33px] lg:w-[53px]"
                />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight lg:text-[2rem]">
                  {isPublicLoading ? (
                    <Skeleton className="h-10 w-20" />
                  ) : (
                    achievement.getHeading(highestScore)
                  )}
                </p>
                <p className="text-sm lg:text-xl">{achievement.subHeading}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
