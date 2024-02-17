import { useState } from "react";
import Timer from "./components/Timer/Timer";
import Header from "./components/Header/Header";

export type TimerTabType = "Pomodoro" | "Short Break" | "Long Break";

enum BackgroundColor {
  Pomodoro = "bg-indigo-900",
  Short = "bg-cyan-900",
  Long = "bg-emerald-900",
}

function App() {
  const [selectedTab, setSelectedTab] = useState<TimerTabType>("Pomodoro");

  const selectedColor = () => {
    switch (selectedTab) {
      case "Pomodoro":
        return BackgroundColor.Pomodoro;
      case "Short Break":
        return BackgroundColor.Short;
      case "Long Break":
        return BackgroundColor.Long;
      default:
        return BackgroundColor.Pomodoro;
    }
  };

  return (
    <div className={`h-screen transition-colors ${selectedColor()}`}>
      <Header />
      <Timer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}

export default App;
