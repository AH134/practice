import { useEffect, useState } from "react";
import { TimeType } from "../types/time";
import formatTime from "../utils/formatTime";

/**
 *
 * @param initialTime initial countdown timer in ms
 * @param callback executed function whenever time reaches zero
 */

function useCountdown(
  initialTime: number,
  callback: () => void,
  start: boolean
) {
  const [actualTime, setActualTime] = useState(initialTime);
  const [time, setTime] = useState<TimeType>(formatTime(initialTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (actualTime > 0) {
        const newTime = actualTime - 1000;
        setActualTime(newTime);
        setTime(formatTime(newTime));
      }
    }, 1000);

    if (actualTime === 0) {
      callback();
    }

    if (!start) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [actualTime, callback, start]);

  return { time, setTime, setActualTime };
}

export default useCountdown;
