"use client";
import {
  Competition,
  Tile,
  createTrihexDeckBySeed,
  generateTileMapBySeed,
} from "tileville-chain-dev";

import { useNetworkStore } from "@/lib/stores/network";
import {
  useMinaBridge,
  useProtokitBalancesStore,
} from "@/lib/stores/protokitBalances";
import AppChainClientContext from "@/lib/contexts/AppChainClientContext";
import { minapolisConfig } from "@/game-config";
import { useContext, useEffect, useState } from "react";
import { useStateRef } from "@/hooks/useStateRef";
import { PublicKey } from "o1js";

export const NewMinapolisCompetitionPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [seed, setSeed] = useState(0);
  const [preregistrationEnabled, setPreregistrationEnabled] = useState(true);
  const [preregistrationFrom, setPreregistrationFrom] = useState("");
  const [preregistrationTo, setPreregistrationTo] = useState("");

  const [competitionFrom, setCompetitionFrom] = useState("");
  const [competitionTo, setCompetitionTo] = useState("");
  const [funding, setFunding] = useState(0);
  const [participationFee, setParticipationFee] = useState(0);

  const [tiles, setTiles, tilesRef] = useStateRef<Tile[]>([]);
  const networkStore = useNetworkStore();
  const protokitBalances = useProtokitBalancesStore();
  const bridge = useMinaBridge();
  const client = useContext(AppChainClientContext);

  if (!client) {
    throw Error("Context app chain client is not set");
  }

  const createCompetition = async () => {
    const gameHub = client.runtime.resolve("MinapolisGameHub");
    const isEnoughFunds = bridge(BigInt(funding) * 10n ** 9n);
    if (!isEnoughFunds) {
      throw Error("Not enough funds");
    }

    const tx = await client.transaction(
      PublicKey.fromBase58(networkStore.address!),
      async () => {
        const competition = Competition.from(
          name,
          seed,
          preregistrationEnabled,
          new Date(preregistrationFrom).getTime() || 0,
          new Date(preregistrationTo).getTime() || 0,
          preregistrationEnabled ? new Date(competitionFrom).getTime() : 0,
          preregistrationEnabled ? new Date(competitionTo).getTime() : 0,
          funding,
          participationFee
        );

        await gameHub.createCompetition(competition);
      }
    );

    await tx.sign();
    await tx.send();
  };

  return (
    <div>
      <button
        onClick={() => {
          networkStore.connectWallet();
        }}
      >
        {" "}
        connect wallet
      </button>
      
    </div>
  );
};
