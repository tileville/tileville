// Update this file at src/components/PVP/ChallengesTabs/CreatedChallenge.tsx

import { PRIMARY_OUTLINE_BUTTON } from "@/constants";
import { Challenge } from "@/types";
import { Spinner2 } from "@/components/common/Spinner";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";

type CreatedChallengeType = {
  isLoadingCreated: boolean;
  createdChallenges: {
    success: boolean;
    data: Challenge[];
  };
};

export const CreatedChallenge = ({
  isLoadingCreated,
  createdChallenges,
}: CreatedChallengeType) => {
  if (isLoadingCreated) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spinner2 />
      </div>
    );
  }

  if (!createdChallenges?.data?.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-500">
          You Have not created any challenges yet!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#435133] bg-[#C6C99C] p-8">
      <h2 className="text-2xl font-semibold text-[#378209]">Your Challenges</h2>
      <div>
        <div className="grid grid-cols-5 py-3 text-base font-semibold text-black">
          <div>S.N</div>
          <div>Challenge Name</div>
          <div className="text-center">Ends In</div>
          <div className="text-center">Entry Fees</div>
          <div className="text-center">Action</div>
        </div>
        <div className="h-[2px] w-full rounded-[5px] bg-[#38830A]"></div>
        <div className="py-4">
          <div className="grid gap-4">
            {createdChallenges.data.map((challenge: Challenge) => (
              <div
                className="grid w-full grid-cols-5 rounded-[10px] border border-[#76993E] p-4"
                key={challenge.id}
              >
                <div>{challenge.id}</div>
                <div>{challenge.name}</div>
                <div className="text-center">
                  <CountdownTimerSmall endTime={challenge.end_time} />
                </div>
                <div className="text-center">{challenge.entry_fee} MINA</div>
                <div className="text-center">
                  <button className={PRIMARY_OUTLINE_BUTTON}>Played</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
