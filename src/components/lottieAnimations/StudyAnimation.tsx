import React from "react";
import studyAnimationfile from "@/assets/study.json";
import { useLottie } from "lottie-react";

const styles = {
  height: 400,
};

const options = {
  animationData: studyAnimationfile,
  autoplay: true, // Starts automatically
  loop: true, // Loops continuously
};

const StudyAnimation: React.FC = () => {
  const lottieObj = useLottie(options, styles);

  return <>{lottieObj.View}</>;
};

export default StudyAnimation;
