import {
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
  TriangleLeftIcon,
} from "@radix-ui/react-icons";
import { Play } from "next/font/google";
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

const tracks = [
  {
    url: "sfx/ambience.wav",
    title: "Ambience",
    tags: ["house"],
  },
  {
    url: "/medias/1_melody-of-nature.mp3",
    title: "Melody Of Nature",
    tags: ["dnb"],
  },
  {
    url: "/medias/2_scott-buckley-moonlight.mp3",
    title: "scott buckley moonlight",
    tags: ["dnb"],
  },

  // {
  //   url: "/medias/3_rain.mm4a",
  //   title: "rain",
  //   tags: ["dnb"],
  // },
];

export const MediaPlayer = () => {
  const { load, play, togglePlayPause, loop, looping, playing } =
    useGlobalAudioPlayer();
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    load(tracks[songIndex].url, {
      autoplay: true,
      loop: true,
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
    <div className="grid grid-cols-3 rounded-md py-3 text-primary shadow-md">
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
  );
};
