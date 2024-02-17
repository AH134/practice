import React from "react";
import { TimerTabType } from "../../App";

type TimerButtonProps = {
  label: string;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<TimerTabType>>;
};

function TabButton({ label, selectedTab, setSelectedTab }: TimerButtonProps) {
  const handleOnClick = () => {
    setSelectedTab(label as TimerTabType);
  };

  return (
    <button
      className={`m-2 w-24 rounded-md hover:transition-all hover:text-rose-100 ${
        selectedTab === label
          ? "bg-gray-900 bg-opacity-45 text-white"
          : "text-gray-100"
      }`}
      onClick={() => handleOnClick()}
    >
      {label}
    </button>
  );
}

export default TabButton;
