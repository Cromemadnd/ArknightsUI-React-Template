import { BatteryIcon, RecuritIcon } from "./Icons.tsx";
import { RecruitButton, BaseButton, clickSound } from "./Buttons.tsx";
import { useState, useEffect } from "react";
import { FlexContainer } from "./Containers.tsx";

export function RecuritCol() {
  return (
    <div className="bg-button-light h-35 w-100 backdrop-blur-xs">
      <FlexContainer className="h-32 flex-col p-2" gap={0}>
        <FlexContainer
          className="bg-sanity-dark text-title-very-dark items-center py-1 pl-3 text-normal"
          gap={3}
        >
          <RecuritIcon />
          招募
        </FlexContainer>
        <div className="flex">
          <RecruitButton title="recurit" subtitle="公开招募" />
          <RecruitButton title="headhunt" subtitle="干员寻访" />
        </div>
      </FlexContainer>
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
    <FlexContainer
      className="font-datetime text-shadow-normal h-6 w-185 items-center text-normal"
      gap={2}
    >
      <hr className="w-20 border-t-4" />
      {batteryLevel !== null && <BatteryIcon batteryLevel={batteryLevel} />}
      {currentTime.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
      <hr className="w-90 border-t-4" />
    </FlexContainer>
  );
}

export function ItemsCol() {
  return (
    <FlexContainer
      gap={2}
      className="text-shadow-normal bg-items-bg text-x-large -mt-2 h-12 w-190 -translate-x-8 items-center"
    >
      <img src="./icon_png/icon_money.png" className="mt-1 h-15 w-15" />
      1000000
      <img src="./icon_png/icon_jade.png" className="mt-1 h-15 w-15" />
      10000
      <BaseButton blur={false}>
        <img src="./icon_svg/plus.svg" className="mt-1 h-10 w-10" />
      </BaseButton>
      <img src="./icon_png/icon_originium.png" className="mt-1 h-15 w-15" />
      10000
      <BaseButton blur={false}>
        <img src="./icon_svg/plus.svg" className="mt-1 h-10 w-10" />
      </BaseButton>
    </FlexContainer>
  );
}

export function NewsCol() {
  // 此处可以对接网站后端
  const banners = ["./banners/1.png", "./banners/2.png", "./banners/3.png"];

  const [index, setIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragEndX, setDragEndX] = useState(0);

  const width = 72;
  const gap = 6;

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
    clickSound.play();
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
        Math.max(
          index - Math.round((e.clientX - dragStartX) / ((width + gap) * 3)),
          0,
        ),
        banners.length - 1,
      ),
    );
    setDragStartX(0);
    setDragEndX(0);
  }

  return (
    <div
      className={`ml-2 h-34 w-${width} overflow-visible`}
      draggable={true}
      onDragStart={handleDragStart}
      onDrag={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          height: "136px",
          width: `${width * 4}px`,
          overflow: "hidden",
        }}
      >
        <div className="bg-news-bg font-news shadow-normal absolute z-1 -mt-2 -ml-2 w-33 pl-1 font-bold">
          BREAKING NEWS
        </div>

        <BaseButton
          style={{
            transform: `translateX(${Math.max(
              Math.min(
                dragEndX - dragStartX - index * (width + gap) * 4,
                (width + gap) * 4,
              ),
              -banners.length * (width + gap) * 4,
            )}px)`,
            gap: `${gap * 4}px`,
            transition: "transform 250ms ease-out",
          }}
          onClick={() => console.log(index)}
        >
          {banners.map((banner, i) => (
            <img
              key={i}
              src={banner}
              style={{
                height: "136px",
                maxWidth: `${width * 4}px`,
                minWidth: `${width * 4}px`,
              }}
            />
          ))}
        </BaseButton>
      </div>

      {banners.map((_, i) => (
        <hr
          style={{
            // 设置线长:间隔为10:1
            width: `${18 / (1.1 * banners.length - 0.1)}rem`,
            marginLeft: `${(i * 1.1 * 18) / (1.1 * banners.length - 0.1)}rem`,
            borderColor: i == index ? "#ff9900" : "#ffffff",
          }}
          className={`absolute mt-2 border-t-6`}
        />
      ))}
    </div>
  );
}
