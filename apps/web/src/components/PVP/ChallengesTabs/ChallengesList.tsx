"use client";
import { useState } from "react";
import { Challenge, ChallengeResponse } from "@/types";
import { ChallengeDetails } from "./ChallengeDetails";
import { TransactionStatus } from "@/lib/types";
import { ChallengeListItem } from "../ChallengeListItem";
import { TABS } from "@/app/pvp/PVPContent";
import { ChallengesListSkeleton } from "./ChallengesListSkeleton";
import { getChallengeStatus } from "@/lib/helpers";

type ChallengesListType = {
  isLoading?: boolean;
  challenges?: ChallengeResponse;
  challengesType: string;
};

export const ChallengesList = ({
  isLoading,
  challenges,
  challengesType,
}: ChallengesListType) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  const renderEmptyState = () => (
    <div className="mt-8 flex items-center justify-center rounded-xl bg-[#B4C28E] text-center md:min-h-[135px]">
      <p className="max-w-[380px] text-2xl font-bold text-black">
        You Have not{" "}
        {challengesType === TABS.CREATED.id ? "created" : "accepted"} any
        challenges yet!
      </p>
    </div>
  );

  const renderChallengeList = () => {
    if (!challenges?.data?.length && !isLoading) return renderEmptyState();

    return challenges?.data.map(({ challenge, participants }, index) => {
      const txn_status = participants[0]?.txn_status as TransactionStatus;
      const has_played = participants[0]?.has_played;
      const challengeStatus = getChallengeStatus({ txn_status, has_played });
      const updatedChallenge = { ...challenge, status: challengeStatus };

      return (
        <ChallengeListItem
          key={challenge.id}
          challengeID={challenge.id}
          sn={index + 1}
          challengeName={challenge.name}
          challengeStatus={challengeStatus}
          selectedChallengeId={selectedChallenge?.id}
          selectChallengeFn={() => setSelectedChallenge(updatedChallenge)}
          endTime={challenge.end_time}
          entryFee={challenge.entry_fee}
        />
      );
    });
  };

  const renderDetailsSection = () => {
    if (!selectedChallenge) {
      return (
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-400 p-8 text-center text-gray-500">
          Select a challenge to view details
        </div>
      );
    }

    const selectedChallengeData = challenges?.data.find(
      (c) => c.challenge.id === selectedChallenge.id
    );

    return (
      <ChallengeDetails
        challenge={selectedChallenge}
        participants={selectedChallengeData?.participants || []}
      />
    );
  };

  return (
    <div className="rounded-xl p-2 md:border md:border-[#435133] md:bg-[#C6C99C] md:px-8 md:pb-6 md:pt-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7">
          <h2 className="hidden text-base font-semibold text-primary md:block md:text-2xl">
            Your Challenges
          </h2>
          <div className="hidden grid-cols-12 py-3 text-xs font-semibold text-black md:grid md:text-base">
            <div className="col-span-1">S.N</div>
            <div className="col-span-3">Challenge Name</div>
            <div className="col-span-3 text-center">Ends In</div>
            <div className="col-span-2 text-center">Entry Fees</div>
            <div className="col-span-3 text-center">Status</div>
          </div>

          <div className="hidden h-[2px] w-full rounded-[5px] bg-[#38830A] md:block"></div>
          <div className="max-h-[calc(100vh-460px)] overflow-auto pr-4 md:my-4">
            <div className="flex gap-1 pb-2 md:grid md:gap-4 md:pb-0">
              {isLoading ? <ChallengesListSkeleton /> : renderChallengeList()}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          {renderDetailsSection()}
        </div>
      </div>
    </div>
  );
};

export enum ChallengeStatus {
  TXN_NOT_CONFIRMED = "TRANSACTION NOT CONFIRMED",
  READY_TO_PLAY = "READY TO PLAY",
  ALREADY_PLAYED = "ALREADY PLAYED",
  PAYMENT_FAILED = "PAYMENT FAILED",
  UNKNOWN_ERROR = "UNKNOWN ERROR",
  PAYMENT_NOT_INIT = "PAYMENT NOT DONE",
}
