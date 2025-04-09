import { Button } from "@headlessui/react";
import { FlexContainer } from "./Containers";

// eslint-disable-next-line react-refresh/only-export-components
export const clickSound = new Audio("./click.wav");

export function BaseButton({
  children,
  className = "",
  onClick,
  style = {},
  ref,
  blur = true,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLButtonElement>;
  blur?: boolean;
}) {
  return (
    <Button
      className={`${className} pointer-events-auto relative flex justify-start overflow-hidden text-left ${blur ? "backdrop-blur-xs" : ""} after:pointer-events-none after:absolute after:inset-0 after:transition-colors active:after:bg-black/20`}
      style={style}
      ref={ref}
      onClick={(event) => {
        clickSound.currentTime = 0;
        clickSound.play();

        if (onClick !== undefined) {
          onClick(event);
        }
      }}
    >
      {children}
    </Button>
  );
}

export function SmallButton({ title = "", subtitle = "" }) {
  return (
    <BaseButton className="bg-button-dark h-40 w-85 items-center pl-2">
      <div className="border-l-border-dark h-32 flex-col border-l-8 pl-4">
        <div className="font-primary text-title-dark text-xx-large mt-1 w-fit">
          {title}
        </div>
        <div className="font-secondary text-subtitle-dark text-large -mt-4 font-bold">
          {subtitle}
        </div>
      </div>
    </BaseButton>
  );
}

export function StoreButton() {
  return (
    <BaseButton className="bg-button-light h-35 w-60 items-center pl-2">
      <div className="h-30 flex-col pl-2">
        <div className="font-primary text-title-light text-x-large mt-3 w-fit">
          采购中心
        </div>
        <div className="font-secondary text-subtitle-light text-large -mt-4 font-bold">
          store
        </div>
      </div>
    </BaseButton>
  );
}

export function RecruitButton({ title = "", subtitle = "" }) {
  return (
    <BaseButton className="h-22 w-53 flex-col items-center" blur={false}>
      <div className="font-secondary text-subtitle-light text-large font-bold">
        {title}
      </div>
      <div className="font-primary text-title-light text-large -mt-3">
        {subtitle}
      </div>
    </BaseButton>
  );
}

export function TerminalButton() {
  return (
    <BaseButton className="bg-button-dark -mt-6 h-55 w-220 translate-x-30 -translate-z-10 overflow-hidden">
      <FlexContainer
        gap={0}
        className="text-title-light m-5 w-58 flex-col text-right"
      >
        <div className="text-huge bg-sanity-light text-shadow-large pr-6">
          <div className="-mt-4">100</div>
        </div>
        <div className="bg-sanity-dark text-large pr-6">理智/180</div>
      </FlexContainer>

      <FlexContainer gap={0} className="ml-2 flex-col">
        <div className="font-secondary text-huge text-subtitle-dark font-bold">
          terminal
        </div>
        <div className="bg-current-wrapper text-title-very-dark -mt-6 size-fit rounded-md px-2.5 pt-0.5 pb-1 text-normal">
          当前
        </div>
        <div className="text-title-dark size-fit text-normal">全部完成</div>
      </FlexContainer>
    </BaseButton>
  );
}

export function FriendsButton() {
  return (
    <BaseButton className="bg-button-friends h-17 w-48 flex-col items-end pr-2">
      <div className="font-secondary text-subtitle-mid text-normal">
        friends
      </div>
      <div className="font-primary text-title-light text-large -mt-3 w-fit">
        好友
      </div>
    </BaseButton>
  );
}

export function ArchiveButton() {
  return (
    <BaseButton className="bg-button-archive h-17 w-48 flex-col items-end pr-2">
      <div className="font-secondary text-subtitle-mid text-normal">
        archive
      </div>
      <div className="font-primary text-title-light text-large -mt-3 w-fit">
        档案
      </div>
    </BaseButton>
  );
}

export function DepotButton() {
  return (
    <BaseButton className="bg-button-depot -ml-6 w-24 flex-col pt-6 pl-1">
      <div className="font-primary text-title-dark text-x-large">仓库</div>
      <div className="font-secondary text-title-very-dark text-large -mt-3">
        depot
      </div>
    </BaseButton>
  );
}
