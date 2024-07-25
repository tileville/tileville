import {
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { VolumeControl } from "./VolumeControl";

const tracks = [
  {
    url: "/sfx/ambience.wav",
    title: "Ambience",
    tags: ["house"],
  },
  {
    url: "/medias/sound1.ogg",
    title: "Melody Of Nature",
    tags: ["dnb"],
  },
  {
    url: "/medias/sound2.ogg",
    title: "scott buckley moonlight",
    tags: ["dnb"],
  },
];

export const MediaPlayer = () => {
  const { load, togglePlayPause, playing } = useGlobalAudioPlayer();
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    load(tracks[songIndex].url, {
      autoplay: true,
      loop: true,
      initialVolume: 0.5,
    });
  }, [songIndex, load]);

  const handleTogglePlayPause = () => {
    togglePlayPause();
  };

  const handleNextTrack = () => {
    if (songIndex >= tracks.length - 1) {
      setSongIndex(0);
    } else {
      setSongIndex(songIndex + 1);
    }
  };

  const handlePreviousTrack = () => {
    if (songIndex <= 0) {
      setSongIndex(tracks.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  return (
    <div className="flex gap-3 rounded-md p-3 text-primary shadow-md">
      <div className="flex gap-3">
        <button
          className="flex items-center justify-center"
          onClick={handlePreviousTrack}
        >
          <TrackPreviousIcon />
        </button>

        <button
          className="flex items-center justify-center"
          onClick={handleTogglePlayPause}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          className="flex items-center justify-center"
          onClick={handleNextTrack}
        >
          <TrackNextIcon />
        </button>
      </div>

      <div className="h-4 w-[1px] bg-primary/10"></div>

      <div>
        <VolumeControl />
      </div>
    </div>
  );
};
