import { useState } from "react";
import { Challenge, ChallengeResponse } from "@/types";
import { Spinner2 } from "@/components/common/Spinner";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";
import { ChallengeDetails } from "./ChallengeDetails";
import { PRIMARY_OUTLINE_BUTTON } from "@/constants";

type ChallengesListType = {
  isLoadingCreated?: boolean;
  isLoadingAccepted?: boolean;
  challenges?: ChallengeResponse;
};

export const ChallengesList = ({
  isLoadingCreated,
  isLoadingAccepted,
  challenges,
}: ChallengesListType) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  if (isLoadingCreated || isLoadingAccepted) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spinner2 />
      </div>
    );
  }

  if (!challenges?.data?.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-500">
          You Have not {isLoadingCreated ? "created" : "accepted"} any
          challenges yet!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#435133] bg-[#C6C99C] p-8">
      <h2 className="text-2xl font-semibold text-[#378209]">Your Challenges</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <div
            className={`grid grid-cols-5 py-3 text-base font-semibold text-black`}
          >
            <div>S.N</div>
            <div>Challenge Name</div>
            <div className="text-center">Ends In</div>
            <div className="text-center">Entry Fees</div>
            <div className="text-center">Action</div>
          </div>
          <div className="h-[2px] w-full rounded-[5px] bg-[#38830A]"></div>
          <div className="py-4">
            <div className="grid gap-4">
              {challenges.data.map((ChallengeData) => (
                <div
                  className={`grid w-full cursor-pointer grid-cols-5 rounded-[10px] border border-[#76993E] p-4 ${
                    selectedChallenge?.id === ChallengeData.challenge.id
                      ? "border-primary bg-[#99B579] outline outline-2 outline-[#38830A]"
                      : "border-[#76993E]"
                  }`}
                  onClick={() => {
                    setSelectedChallenge(ChallengeData.challenge);
                  }}
                  key={ChallengeData.challenge.id}
                >
                  <div>{ChallengeData.challenge.id}</div>
                  <div>{ChallengeData.challenge.name}</div>
                  <div className="text-center">
                    <CountdownTimerSmall
                      endTime={ChallengeData.challenge.end_time}
                    />
                  </div>
                  <div className="text-center">
                    {ChallengeData.challenge.entry_fee} MINA
                  </div>
                  <div className="text-center">
                    <button
                      className={PRIMARY_OUTLINE_BUTTON}
                      onClick={() => {
                        console.log("CLICKED");
                      }}
                    >
                      {ChallengeData.challenge.status === "PENDING"
                        ? "Play"
                        : "Played"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-5">
          {selectedChallenge ? (
            <ChallengeDetails
              challenge={selectedChallenge}
              participants={
                challenges.data.find(
                  (c) => c.challenge.id === selectedChallenge.id
                )?.participants || []
              }
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-400 p-8 text-center text-gray-500">
              Select a challenge to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
