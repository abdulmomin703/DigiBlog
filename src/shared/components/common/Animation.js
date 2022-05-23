import React from "react";
import Lottie from "react-lottie";

function Animation({ Pic, Message }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Pic,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        isStopped={false}
        isPaused={false}
        height={"80%"}
        width={"63%"}
      />
      {Message && (
        <h3 className="text-secondary text-center mt-4">{Message}</h3>
      )}
    </div>
  );
}

export default Animation;
