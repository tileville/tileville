import { createZkNoidGameConfig } from "@/lib/createConfig";
import { ZkNoidGameType } from "@/lib/platform/game_types";
import { MinapolisGameHub } from "tileville-chain-dev";
import { MinaPolisPage } from "@/components/MinapolisPage";
import { TileVilleCompetitionPage } from "@/components/TileVilleCompetitionPage";
import { TileVilleCompetitionListPage } from "@/components/TileVilleCompetitionListPage";
import { ZkNoidGameFeature, ZkNoidGameGenre } from "@/lib/platform/game_tags";

export const minapolisConfig = createZkNoidGameConfig({
  id: "TileVille",
  type: ZkNoidGameType.SinglePlayer,
  name: "TileVille game",
  description: "on-chain strategic city building game",
  image: "/image/games/arkanoid.svg",
  genre: ZkNoidGameGenre.Arcade,
  features: [ZkNoidGameFeature.SinglePlayer],
  isReleased: true,
  releaseDate: new Date(2023, 11, 1),
  popularity: 60,
  author: "Satyam Bansal",
  rules: `In TileVille, your objective is build a city around the center with hexagonal road, tree, and windmill tiles
    `,
  runtimeModules: {
    MinapolisGameHub: MinapolisGameHub as any,
  },
  page: MinaPolisPage,
  pageCompetitionsList: TileVilleCompetitionListPage,
  pageNewCompetition: TileVilleCompetitionPage,
});
