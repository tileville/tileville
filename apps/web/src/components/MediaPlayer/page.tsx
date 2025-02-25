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

  // Load the current track whenever the songIndex changes
  useEffect(() => {
    load(TRACKS[songIndex].url, {
      autoplay: true,
      loop: true,
      initialVolume: 0.5,
    });
  }, [songIndex, load]);

  // Navigation handlers
  const handleTogglePlayPause = () => togglePlayPause();

  const handleNextTrack = () => {
    setSongIndex((prevIndex) =>
      prevIndex >= TRACKS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousTrack = () => {
    setSongIndex((prevIndex) =>
      prevIndex <= 0 ? TRACKS.length - 1 : prevIndex - 1
    );
  };

  // UI Components
  const PlayPauseButton = () => (
    <button
      className="flex items-center justify-center"
      onClick={handleTogglePlayPause}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );

  const NavigationButtons = () => (
    <div className="flex gap-6 lg:gap-3">
      <button
        className="flex items-center justify-center"
        onClick={handlePreviousTrack}
      >
        <TrackPreviousIcon />
      </button>

      <PlayPauseButton />

      <button
        className="flex items-center justify-center"
        onClick={handleNextTrack}
      >
        <TrackNextIcon />
      </button>
    </div>
  );

  return (
    <div className="flex justify-between gap-3 rounded-xl bg-primary/20 px-5 py-3 text-primary shadow-[0px_4px_4px_0px_#00000040]">
      <NavigationButtons />

      <div className="h-4 w-[1px] bg-primary/10"></div>

      <div>
        <VolumeControl />
      </div>
    </div>
  );
};
