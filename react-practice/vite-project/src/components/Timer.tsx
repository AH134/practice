import { useState, useEffect } from "react";
import { getRemainingTime } from "./utils/getRemainingTime";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Timer = ({ countdownTimestampMs }: any) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown: any) {
    setRemainingTime(getRemainingTime(countdown));
  }

  return (
    <>
      <h1>Timer</h1>
      <div>
        <span>{remainingTime.days}</span>
        <span>days</span>
        <span>{remainingTime.hours}</span>
        <span>hours</span>
        <span>{remainingTime.minutes}</span>
        <span>minutes</span>
        <span>{remainingTime.seconds}</span>
        <span>seconds</span>
      </div>
    </>
  );
};

export default Timer;
