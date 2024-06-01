import { useEffect } from "react";
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
];

export const MediaPlayer = () => {
  const { load, play, pause } = useGlobalAudioPlayer();
  useEffect(() => {
    load(tracks[0].url, { autoplay: true });
  }, []);

  return (
    <div className="h-[100px]">
      <button
        onClick={() => {
          play();
        }}
      >
        play
      </button>
      <button
        onClick={() => {
          pause();
        }}
      >
        pause
      </button>
    </div>
  );
};
