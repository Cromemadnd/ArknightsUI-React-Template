import { useState, useEffect } from "react";
import {
  ArchiveButton,
  BaseButton,
  FriendsButton,
  SmallButton,
  StoreButton,
  TerminalButton,
} from "./Buttons.tsx";
import { DatetimeCol, NewsCol, RecuritCol } from "./Columns.tsx";
import {
  FlexContainer,
  LargeContainer,
  ThreeDContainer,
} from "./Containers.tsx";
import { LevelIcon } from "./Icons.tsx";

function App() {
  // 处理缩放
  const [scale, setScale] = useState(
    Math.min(window.innerWidth / 1600, window.innerHeight / 900),
  );
  // 处理3D变换跟随鼠标效果
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScale(Math.min(window.innerWidth / 1600, window.innerHeight / 900));
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: -e.clientY / window.innerHeight + 0.5,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    /* 最外层div负责处理页面缩放 */
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center", // 修改为center
        width: "1600px",
        height: "900px",
        position: "absolute", // 添加绝对定位
        left: "50%", // 水平居中
        top: "50%", // 垂直居中
        marginLeft: "-800px", // 向左移动宽度的一半
        marginTop: "-450px", // 向上移动高度的一半
      }}
    >
      {/* 2D元素 */}
      <LargeContainer className="items-start justify-start">
        <img src="/assistant.png" className="absolute inset-0 -z-1 ml-60" />

        <FlexContainer className="pointer-events-auto z-2 mt-8 ml-8 gap-8">
          <BaseButton className="w-16 shadow-2xl">
            <img src="/icon_svg/settings.svg" />
          </BaseButton>
          <BaseButton className="w-16 shadow-2xl">
            <img src="/icon_svg/notice.svg" />
          </BaseButton>
          <BaseButton className="w-16 shadow-2xl">
            <img src="/icon_svg/mail.svg" />
          </BaseButton>
          <BaseButton className="w-16 shadow-2xl">
            <img src="/icon_svg/calendar.svg" />
          </BaseButton>
        </FlexContainer>

        <LevelIcon />

        <div className="bg-gray-900"></div>

        <div className="ml-12 text-center text-[2rem]">Cromemadnd</div>
        <div className="ml-12 text-center text-[1rem]">ID: 000000000</div>
      </LargeContainer>

      {/* 左侧3D元素 */}
      <LargeContainer className="items-start justify-end">
        <ThreeDContainer
          rotx={mousePosition.y}
          roty={8 + mousePosition.x}
          className="mb-15 ml-12"
        >
          <BaseButton
            className="mt-140 ml-2 flex h-32 w-140 flex-col overflow-visible bg-[#00000088] transition-opacity duration-500"
            onClick={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <div className="absolute z-1 -mt-2 -ml-2 w-40 bg-[#777777] pl-1 text-[#333333] shadow-[0.2rem_0.15rem_#00000099]">
              VOICE
            </div>
            <div className="absolute flex h-32 items-center pr-6 pl-6 text-[1.25rem] text-[#ffffff]">
              喵喵喵喵喵？喵喵，喵喵喵！喵喵？
            </div>
            <div className="mt-22 mr-4 text-right text-[1.25rem]">▼</div>
          </BaseButton>
          <FlexContainer>
            <NewsCol />

            <FlexContainer className="flex-col" gap={3}>
              <FriendsButton />
              <ArchiveButton />
            </FlexContainer>
          </FlexContainer>
        </ThreeDContainer>
      </LargeContainer>

      {/* 右侧3D元素 */}
      <LargeContainer className="items-end justify-center overflow-hidden">
        <ThreeDContainer
          rotx={mousePosition.y}
          roty={mousePosition.x - 8}
          className="items-end"
        >
          <DatetimeCol />
          <FlexContainer
            gap={2}
            className="-mt-2 h-12 w-200 -translate-x-8 items-center bg-[#22222277] text-[2.5rem] text-shadow-[0.2rem_0.15rem_#00000099]"
          >
            <img src="/icon_png/icon_money.png" className="mt-1 h-15 w-15" />
            1000000
            <img src="/icon_png/icon_jade.png" className="mt-1 h-15 w-15" />
            1000000
            <img
              src="/icon_png/icon_originium.png"
              className="mt-1 h-15 w-15"
            />
            1000000
          </FlexContainer>

          <TerminalButton />
          <FlexContainer className="-translate-z-10">
            <SmallButton subtitle="squads" title="编队" />
            <SmallButton subtitle="operator" title="干员" />
            <div className="w-16 bg-[#000000cc]"></div>
          </FlexContainer>

          <FlexContainer gap={0}>
            <StoreButton />
            <RecuritCol />
            <div className="w-14" />
          </FlexContainer>

          <FlexContainer className="translate-x-5 translate-y-10 -translate-z-20">
            <SmallButton subtitle="mission" title="任务" />
            <SmallButton subtitle="base" title="基建" />
            <BaseButton className="-ml-6 flex w-24 flex-col bg-[#222222dd] pt-6 pl-1">
              <div className="font-['FZZYS'] text-[2.5rem] text-[#b9b9b9ff]">
                仓库
              </div>
              <div className="-mt-3 font-['SamigirianSerif'] text-[2rem] text-[#777777]">
                depot
              </div>
            </BaseButton>
            <div />
          </FlexContainer>
        </ThreeDContainer>
      </LargeContainer>
    </div>
  );
}

export default App;
