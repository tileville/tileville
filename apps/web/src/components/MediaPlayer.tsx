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
    title: "NightDrive",
    tags: ["house"],
  },

  {
    url: "/medias/2_TheChronic.mp3",
    title: "The Chronic",
    tags: ["dnb"],
  },

  {
    url: "/medias/1_NightDrive.mp3",
    title: "The Chronic",
    tags: ["dnb"],
  },

  {
    url: "/medias/3_KeyGenh.mp3",
    title: "The Chronic",
    tags: ["dnb"],
  },
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
