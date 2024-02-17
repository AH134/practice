import { TimerTabType } from "../../App";
import { useEffect, useState, useMemo } from "react";
import TabButton from "./TabButton";
import useCountdown from "../../hooks/useCountdown";
import formatTime from "../../utils/formatTime";

type TimerProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<TimerTabType>>;
};

type TabTimeType = {
  [key: string]: number;
};

function Timer(props: TimerProps) {
  const tabTime: TabTimeType = useMemo(() => {
    return {
      Pomodoro: 1800000,
      "Long Break": 900000,
      "Short Break": 300000,
    };
  }, []);
  const { selectedTab, setSelectedTab } = props;
  const [isStarted, setIsStarted] = useState(false);
  const { time, setTime, setActualTime } = useCountdown(
    tabTime[selectedTab],
    () => changeTab(),
    isStarted
  );

  useEffect(() => {
    setTime(formatTime(tabTime[selectedTab]));
    setActualTime(tabTime[selectedTab]);
  }, [selectedTab, setActualTime, setTime, tabTime]);

  const changeTab = () => {
    setSelectedTab(selectedTab === "Pomodoro" ? "Short Break" : "Pomodoro");
    setTime(formatTime(tabTime[selectedTab]));
    setActualTime(50000);
    setIsStarted(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 bg-opacity-35 max-w-[30rem] h-[21rem] rounded-md m-auto mt-8">
      <div className="h-12 flex justify-center mt-3">
        <TabButton
          label="Pomodoro"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <TabButton
          label="Short Break"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <TabButton
          label="Long Break"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="flex justify-center align-middle text-center text-white font-bold text-[7.5rem]">
        <p>
          {time.minutes}:{time.seconds}
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <button
          className="ml-[76px] w-52 h-16 rounded-md bg-gray-900 text-gray-50 text-3xl hover:transition-all hover:text-rose-100"
          onClick={() => setIsStarted(!isStarted)}
        >
          {!isStarted ? "START" : "PAUSE"}
        </button>
        <button
          className={`ml-14 hover:brightness-75 h-5 ${
            !isStarted ? "invisible" : null
          }`}
          onClick={() => {
            setIsStarted(false);
            setTime(formatTime(tabTime[selectedTab]));
            setActualTime(tabTime[selectedTab]);
          }}
        >
          <img src="/assets/next-white3.png" alt="skip" width="20" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
