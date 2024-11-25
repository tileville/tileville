"use client";
import React from "react";
import { useLottie } from "lottie-react";


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
  const { View } = useLottie(defaultOptions);
  return <>{View}</>;
};

export default LottieAnimation;
