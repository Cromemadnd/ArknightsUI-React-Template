import { BatteryIcon, RecuritIcon } from "./Icons.tsx";
import { RecruitButton, BaseButton } from "./Buttons.tsx";
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
    <div className="flex h-6 w-200 items-center gap-2 font-[Novecento] text-[1.5rem] text-white text-shadow-[0.2rem_0.15rem_#00000099]">
      <hr className="w-25 border-t-4 border-white" />
      {batteryLevel !== null && <BatteryIcon batteryLevel={batteryLevel} />}
      {currentTime.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
      <hr className="w-100 border-t-4 border-white" />
    </div>
  );
}

export function NewsCol() {
  // 此处可以对接网站后端
  const banners = ["/banners/1.png", "/banners/2.png", "/banners/3.png"];

  const [index, setIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragEndX, setDragEndX] = useState(0);

  // 定义空图片，以防止拖拽时显示预览
  const img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  useEffect(() => {
    const timer = setInterval(() => {
      if (dragStartX == 0) setIndex((index + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [index, banners.length, dragStartX]);

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setDragImage(img, 0, 0);
    setDragStartX(e.clientX);
    setDragEndX(e.clientX);
  }

  function handleDragMove(e: React.DragEvent) {
    setDragEndX(e.clientX);
  }

  function handleDragEnd(e: React.DragEvent) {
    setIndex(
      Math.min(
        Math.max(index - Math.round((e.clientX - dragStartX) / 240), 0),
        banners.length - 1,
      ),
    );
    setDragStartX(0);
    setDragEndX(0);
  }

  return (
    <div
      className="h-34 w-84 overflow-visible"
      draggable={true}
      onDragStart={handleDragStart}
      onDrag={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div className="h-34 w-84 overflow-hidden">
        <div className="absolute z-1 -mt-2 -ml-2 w-33 bg-[#a40000] pl-1 font-[EightBitOperator] font-bold shadow-[0.2rem_0.15rem_#00000099]">
          BREAKING NEWS
        </div>

        <BaseButton
          style={{
            // 此处注意translateX以向左为正
            transform: `translateX(${Math.max(Math.min(1.2 * (dragEndX - dragStartX) - index * 360, 60), -banners.length * 360 + 300)}px)`,
          }}
          className="gap-6 transition-transform duration-250 ease-out"
          onClick={() => console.log(index)}
        >
          {banners.map((banner, i) => (
            <img key={i} src={banner} className="h-34 max-w-84 min-w-84" />
          ))}
        </BaseButton>
      </div>

      {banners.map((_, i) => (
        <hr
          style={{
            // 设置线长:间隔为10:1
            width: `${21 / (1.1 * banners.length - 0.1)}rem`,
            marginLeft: `${(i * 1.1 * 21) / (1.1 * banners.length - 0.1)}rem`,
            borderColor: i == index ? "#ff9900" : "#ffffff",
          }}
          className={`absolute mt-2 border-t-6`}
        />
      ))}
    </div>
  );
}
