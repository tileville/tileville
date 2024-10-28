import Image from "next/image";

const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    iconUrl: "/icons/badge.png",
    heading: "125",
    subHeading: "Highest score",
  },
  {
    id: 2,
    iconUrl: "/icons/coins.png",
    heading: "$100",
    subHeading: "Total Rewards",
  },
  {
    id: 3,
    iconUrl: "/icons/trophy.png",
    heading: "5",
    subHeading: "Total Wins",
  },
  {
    id: 4,
    iconUrl: "/icons/medal.png",
    heading: "Gold",
    subHeading: "Current league",
  },
  {
    id: 5,
    iconUrl: "/icons/game.png",
    heading: "23",
    subHeading: "Total games",
  },
  {
    id: 6,
    iconUrl: "/icons/star.png",
    heading: "30th",
    subHeading: "Rank",
  },
];

export const Achievements = () => {
  return (
    <div className="w-full text-black h-full">
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
                />
              </div>
              <div>
                <p className="text-[2rem] font-bold leading-tight">
                  {achievement.heading}
                </p>
                <p className="text-xl">{achievement.subHeading}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
