import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import React, { ChangeEvent, useCallback } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const VolumeControl = () => {
  const { setVolume, volume, mute, muted } = useGlobalAudioPlayer();

  const handleChange = useCallback(
    (slider: ChangeEvent<HTMLInputElement>) => {
      const volValue = parseFloat(
        (Number(slider.target.value) / 100).toFixed(2)
      );
      console.log(volValue);

      return setVolume(volValue);
    },
    [setVolume]
  );

  return (
    <div className="flex items-center justify-between">
      <div className="relative flex w-fit max-w-[80px] items-center">
        <input
          id="default-range"
          type="range"
          className="bg-primary-30 h-1 w-full cursor-pointer appearance-none rounded-lg dark:bg-gray-700"
          min={0}
          max={100}
          onChange={handleChange}
          value={volume * 100}
        />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-full -translate-y-1/2 rounded-xl bg-primary"
          style={{ width: `${volume * 100}%` }}
        ></div>
      </div>

      <button
        className="ps-2"
        onClick={() => {
          mute(!muted);
        }}
      >
        {muted ? <SpeakerOffIcon /> : <SpeakerLoudIcon />}
      </button>
    </div>
  );
};
