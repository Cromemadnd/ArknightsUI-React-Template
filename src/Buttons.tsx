import { Button } from "@headlessui/react";

export function BaseButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      className={`flex justify-start overflow-hidden text-left backdrop-blur-xs after:absolute after:inset-0 after:transition-colors active:after:bg-black/20 ${className}`}
    >
      {children}
    </Button>
  );
}

export function SmallButton({ title = "", subtitle = "" }) {
  return (
    <BaseButton className="h-40 w-85 items-center bg-[#333344aa] pl-2">
      <div className="flex h-32 flex-col border-l-8 border-l-[#6052ff] pl-4">
        <div className="mt-1 w-fit font-['FZZYS'] text-[3.5rem] text-[#b9b9b9ff]">
          {title}
        </div>
        <div className="-mt-4 font-['AgeFonts001'] text-[2rem] font-bold text-[hsl(245,100%,60%)]">
          {subtitle}
        </div>
      </div>
    </BaseButton>
  );
}

export function StoreButton() {
  return (
    <BaseButton className="h-35 w-60 items-center bg-[#4a40bfaa] pl-2">
      <div className="flex h-30 flex-col pl-2">
        <div className="mt-2 w-fit font-['FZZYS'] text-[3rem] text-[#dddddd]">
          采购中心
        </div>
        <div className="-mt-4 font-['AgeFonts001'] text-[2rem] font-bold text-[hsl(245,100%,80%)]">
          store
        </div>
      </div>
    </BaseButton>
  );
}

export function RecruitButton({ title = "", subtitle = "" }) {
  return (
    <BaseButton className="flex h-22 w-53 flex-col items-center">
      <div className="font-['AgeFonts001'] text-[2rem] font-bold text-[hsl(245,100%,80%)]">
        {title}
      </div>
      <div className="-mt-3 font-['FZZYS'] text-[2rem] text-[#dddddd]">
        {subtitle}
      </div>
    </BaseButton>
  );
}

export function TerminalButton() {
  return (
    <BaseButton className="-mt-6 flex h-55 w-220 translate-x-25 -translate-z-10 overflow-hidden bg-[#333344aa]">
      <div className="m-5 flex w-58 flex-col text-right text-[#e4e4e4]">
        <div className="bg-[#88888877] pr-6 text-[6rem] text-shadow-[0.3rem_0.2rem_#00000099]">
          <div className="-mt-4">100</div>
        </div>
        <div className="bg-[#383838ff] pr-6 text-[2rem]">理智/180</div>
      </div>

      <div className="ml-2 flex flex-col">
        <div className="font-['AgeFonts001'] text-[6rem] font-bold text-[#4433ff]">
          terminal
        </div>
        <div className="-mt-6 size-fit rounded-md bg-[#232323ff] px-2.5 pt-0.5 pb-1 text-[1.5rem] text-[#888888ff]">
          当前
        </div>
        <div className="size-fit text-[1.5rem] text-[#b9b9b9ff]">全部完成</div>
      </div>
    </BaseButton>
  );
}