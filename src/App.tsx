import { useState, useEffect, useRef } from "react";
import {
  ArchiveButton,
  BaseButton,
  DepotButton,
  FriendsButton,
  SmallButton,
  StoreButton,
  TerminalButton,
} from "./components/Buttons.tsx";
import {
  DatetimeCol,
  ItemsCol,
  NewsCol,
  RecuritCol,
} from "./components/Columns.tsx";
import {
  FlexContainer,
  LargeContainer,
  ThreeDContainer,
} from "./components/Containers.tsx";
import { ChangeIcon, HideIcon, LevelIcon } from "./components/Icons.tsx";

const bgm = new Audio("./bgm.mp3");
bgm.loop = true;

function App() {
  // 处理缩放
  const [scale, setScale] = useState(
    Math.min(window.innerWidth / 1600, window.innerHeight / 900),
  );
  // 处理3D变换跟随鼠标效果
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // 处理主题切换
  const [theme] = useState(localStorage.getItem("theme") || "ocean");

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

    // 此处重力感应好像没有生效
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        setMousePosition({
          x: Math.min(Math.max(e.gamma / 45, -0.5), 0.5),
          y: Math.min(Math.max(e.beta / 45, -0.5), 0.5),
        });
      }
    };

    localStorage.setItem("theme", theme);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleDeviceOrientation);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [theme]);

  const dialogRef = useRef<HTMLButtonElement>(null);
  const left2DRef = useRef<HTMLDivElement>(null);
  const left3DRef = useRef<HTMLDivElement>(null);
  const right3DRef = useRef<HTMLDivElement>(null);

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
        overflow: "hidden", // 添加溢出隐藏
      }}
    >
      <BaseButton className="absolute -z-2 ml-60 after:hidden" blur={false}>
        <img
          src="./assistant.png"
          onClick={() => {
            if (left2DRef.current?.getAttribute("hidden")) {
              left2DRef.current?.removeAttribute("hidden");
              left3DRef.current?.removeAttribute("hidden");
              right3DRef.current?.removeAttribute("hidden");
              /* 强制触发重绘 */
              void left2DRef.current?.offsetWidth;
              void left3DRef.current?.offsetWidth;
              void right3DRef.current?.offsetWidth;
              left2DRef.current?.style.setProperty("opacity", "1");
              left3DRef.current?.style.setProperty("opacity", "1");
              right3DRef.current?.style.setProperty("opacity", "1");
            } else {
              dialogRef.current?.style.setProperty(
                "opacity",
                dialogRef.current.style.opacity == "0" ? "1" : "0",
              );
            }
          }}
        />
      </BaseButton>

      {/* 2D元素 */}
      <LargeContainer className="items-start justify-start" ref={left2DRef}>
        <FlexContainer className="z-2 mt-8 ml-8 gap-8">
          <BaseButton
            className="w-16 shadow-2xl"
            blur={false}
            onClick={() => {
              if (bgm.paused) {
                bgm.play();
              } else {
                bgm.pause();
              }
            }}
          >
            <img src="./icon_svg/settings.svg" />
          </BaseButton>
          <BaseButton className="w-16 shadow-2xl" blur={false}>
            <img src="./icon_svg/notice.svg" />
          </BaseButton>
          <BaseButton className="w-16 shadow-2xl" blur={false}>
            <img src="./icon_svg/mail.svg" />
          </BaseButton>
          <BaseButton className="w-16 shadow-2xl" blur={false}>
            <img src="./icon_svg/calendar.svg" />
          </BaseButton>
        </FlexContainer>

        <LevelIcon level={120} />
        <div className="bg-level-bg -z-1 -mt-12 h-12 w-48" />

        <div className="text-large ml-12 text-center">Cromemadnd</div>
        <div className="text-x-small ml-12 text-center">ID: 000000000</div>
      </LargeContainer>

      {/* 左侧3D元素 */}
      <LargeContainer className="items-start justify-end" ref={left3DRef}>
        <ThreeDContainer
          rotx={mousePosition.y / 1.8}
          roty={6 + mousePosition.x * 2}
          tranx={-mousePosition.x * 2}
          className="mb-15 ml-12"
        >
          <FlexContainer className="absolute mt-112 ml-68" gap={2}>
            <BaseButton
              className="w-12"
              blur={false}
              onClick={() => {
                left2DRef.current?.style.setProperty("opacity", "0");
                left3DRef.current?.style.setProperty("opacity", "0");
                right3DRef.current?.style.setProperty("opacity", "0");
                setTimeout(() => {
                  left2DRef.current?.setAttribute("hidden", "true");
                  left3DRef.current?.setAttribute("hidden", "true");
                  right3DRef.current?.setAttribute("hidden", "true");
                }, 500);
              }}
            >
              <HideIcon />
            </BaseButton>

            <BaseButton className="w-12" blur={false}>
              <ChangeIcon />
            </BaseButton>

            <div className="-z-1 mt-6 -ml-2 h-0.5 w-36 bg-gradient-to-r from-white to-transparent"></div>
          </FlexContainer>

          <BaseButton
            ref={dialogRef}
            className="bg-dialog-bg mt-140 ml-2 h-32 w-122 flex-col overflow-visible transition-opacity duration-500"
            onClick={() => {
              dialogRef.current?.style.setProperty(
                "opacity",
                dialogRef.current.style.opacity == "0" ? "1" : "0",
              );
            }}
          >
            <div className="bg-voice-bg text-voice-text shadow-normal absolute z-1 -mt-2 -ml-2 w-40 pl-1">
              VOICE
            </div>
            <FlexContainer className="text-small absolute h-32 items-center pr-6 pl-6">
              喵喵喵喵喵？喵喵，喵喵喵！喵喵？
            </FlexContainer>
            <div className="text-small mt-22 mr-4 text-right">▼</div>
          </BaseButton>
          <FlexContainer>
            <NewsCol />

            <FlexContainer className="-ml-3 flex-col" gap={2}>
              <FriendsButton />
              <ArchiveButton />
            </FlexContainer>
          </FlexContainer>
        </ThreeDContainer>
      </LargeContainer>

      {/* 右侧3D元素 */}
      <LargeContainer className="items-end justify-center" ref={right3DRef}>
        <ThreeDContainer
          rotx={mousePosition.y / 1.8}
          roty={mousePosition.x * 2 - 6}
          tranx={-mousePosition.x * 2}
          className="items-end"
        >
          <DatetimeCol />
          <ItemsCol />

          <TerminalButton />
          <FlexContainer className="-translate-z-10">
            <SmallButton subtitle="squads" title="编队" />
            <SmallButton subtitle="operator" title="干员" />
            <div className="bg-placeholder-bg -mr-16 w-32"></div>
          </FlexContainer>

          <FlexContainer gap={0} className="">
            <StoreButton />
            <RecuritCol />
            <div className="w-14" />
          </FlexContainer>

          <FlexContainer className="translate-x-5 translate-y-10 -translate-z-20">
            <SmallButton subtitle="mission" title="任务" />
            <SmallButton subtitle="base" title="基建" />
            <DepotButton />
          </FlexContainer>
        </ThreeDContainer>
      </LargeContainer>
    </div>
  );
}

export default App;
