import { Skeleton } from "@radix-ui/themes";
import Image from "next/image";
import { useTotalWins } from "@/db/react-query-hooks";

type AchievementsProps = {
  highestScore: number;
  totalGames: number;
  totalRewards: number;
  isPublicLoading: boolean;
  walletAddress: string;
};

const getAchievementsData = (totalWins: number | undefined) => [
  {
    id: 1,
    iconUrl: "/icons/badge.png",
    getHeading: (stats: Partial<AchievementsProps>) =>
      stats.highestScore?.toString() || "0",
    subHeading: "Highest score",
  },
  {
    id: 2,
    iconUrl: "/icons/coins.png",
    getHeading: (stats: Partial<AchievementsProps>) =>
      `${stats.totalRewards?.toString() || "0"} MINA`,
    subHeading: "Total Rewards",
  },
  {
    id: 3,
    iconUrl: "/icons/trophy.png",
    getHeading: () => totalWins?.toString() || "0",
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
    getHeading: (stats: Partial<AchievementsProps>) =>
      stats.totalGames?.toString() || "0",
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
  totalGames,
  isPublicLoading,
  totalRewards,
  walletAddress,
}: AchievementsProps) => {
  const { data: totalWins, isLoading: isWinsLoading } =
    useTotalWins(walletAddress);

  const isLoading = isPublicLoading || isWinsLoading;
  const achievementsData = getAchievementsData(totalWins);

  return (
    <div className="h-full w-full text-black">
      <div className="grid h-full grid-cols-2 gap-3">
        {achievementsData.map((achievement) => {
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
                  {isLoading ? (
                    <Skeleton className="h-10 w-20" />
                  ) : (
                    achievement.getHeading({
                      highestScore,
                      totalGames,
                      totalRewards,
                    })
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
