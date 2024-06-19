import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lottie from "react-lottie";

export const LottieAnimation = ({
  animationData,
}: {
  animationData: any;
  className?: string;
}) => {
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
