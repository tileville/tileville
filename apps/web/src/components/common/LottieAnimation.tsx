import React from "react";
import Lottie from "react-lottie";

export const LottieAnimation = ({ animationData }: { animationData: any }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} />;
};

export default LottieAnimation;
