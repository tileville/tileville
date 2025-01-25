import {
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { VolumeControl } from "./VolumeControl";
import { TRACKS } from "@/constants";

export const MediaPlayer = () => {
  const { load, togglePlayPause, playing } = useGlobalAudioPlayer();
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    load(TRACKS[songIndex].url, {
      autoplay: true,
      loop: true,
      initialVolume: 0.5,
    });
  }, [songIndex, load]);

  const handleTogglePlayPause = () => {
    togglePlayPause();
  };

  const handleNextTrack = () => {
    if (songIndex >= TRACKS.length - 1) {
      setSongIndex(0);
    } else {
      setSongIndex(songIndex + 1);
    }
  };

  const handlePreviousTrack = () => {
    if (songIndex <= 0) {
      setSongIndex(TRACKS.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  return (
    <div className="flex justify-between gap-3 rounded-xl bg-primary/20 px-5 py-3 text-primary shadow-[0px_4px_4px_0px_#00000040]">
      <div className="flex gap-6 lg:gap-3">
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
