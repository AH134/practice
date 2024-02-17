import { TimeType } from "../types/time";

function formatTime(time: number): TimeType {
  const toSeconds = Math.floor((time / 1000) % 60);
  const toMinutes = Math.floor((time / 1000 / 60) % 60);

  const formattedTime: TimeType = {
    seconds: toSeconds.toString().padStart(2, "0"),
    minutes: toMinutes.toString().padStart(2, "0"),
  };

  return formattedTime;
}

export default formatTime;
