import { BatteryIcon, RecuritIcon } from "./Icons.tsx";
import { RecruitButton } from "./Buttons.tsx";
import { useState, useEffect } from "react";

export function RecuritCol() {
  return (
    <div className="h-35 w-100 bg-[#4a40bfaa] backdrop-blur-xs">
      <div className="flex h-32 flex-col p-2">
        <div className="flex items-center gap-3 bg-[#333333] py-1 pl-3 text-[1.5rem] text-[#aaaaaa]">
          <RecuritIcon />
          招募
        </div>
        <div className="flex">
          <RecruitButton title="recurit" subtitle="公开招募" />
          <RecruitButton title="headhunt" subtitle="干员寻访" />
        </div>
      </div>
    </div>
  );
}

export function DatetimeCol() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as Navigator)
        // @ts-expect-error 忽略类型检查，因为getBattery API 尚未被 TypeScript 官方支持
        .getBattery()
        .then(
          (battery: {
            level: number;
            charging: boolean;
            addEventListener: (type: string, listener: EventListener) => void;
          }) => {
            setBatteryLevel(Math.round(battery.level * 100));

            battery.addEventListener("levelchange", () => {
              setBatteryLevel(Math.round(battery.level * 100));
            });
          },
        );
    }
  }, []);

  return (
    <div className="flex h-6 w-200 items-center gap-2 text-[1.5rem] text-white text-shadow-[0.2rem_0.15rem_#00000099]">
      <hr className="w-25 border-t-4 border-white" />
      {batteryLevel !== null && <BatteryIcon batteryLevel={batteryLevel} />}
      {currentTime.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
      <hr className="w-110 border-t-4 border-white" />
    </div>
  );
}
