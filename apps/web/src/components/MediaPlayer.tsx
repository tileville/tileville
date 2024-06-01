import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const tracks = [
  {
    url: "/medias/1_NightDrive.mp3",
    title: "NightDrive",
    tags: ["house"],
  },
  {
    url: "/medias/2_TheChronic.mp3",
    title: "The Chronic",
    tags: ["dnb"],
  },
];

export const MediaPlayer = () => {
  return (
    <div className="h-[100px]">
      <Player
        trackList={tracks}
        includeTags={false}
        includeSearch={false}
        showPlaylist={false}
        shortTracks={false}
        customColorScheme={{ playerBackground: "transparent" }}
      />
    </div>
  );
};
