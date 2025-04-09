export function FlexContainer({
  children,
  gap = 6,
  className = "",
}: {
  children: React.ReactNode;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex ${className}`}
      style={{
        transformStyle: "preserve-3d",
        gap: `${gap * 0.25}rem`, // 6 * 0.25 = 1.5rem (Tailwind默认gap-6是1.5rem)
      }}
    >
      {children}
    </div>
  );
}

export function LargeContainer({
  children,
  ref,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col overflow-hidden transition-opacity duration-300 ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export function ThreeDContainer({
  children,
  rotx,
  roty,
  tranx = 0,
  className = "",
}: {
  children: React.ReactNode;
  rotx: number;
  roty: number;
  tranx?: number;
  className?: string;
}) {
  return (
    <div
      style={{
        transform: `perspective(30rem) rotateY(${roty}deg) rotateX(${rotx}deg) translateX(${tranx}rem)`,
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        transition: "transform 0.2s ease-out",
      }}
      className={`flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
}
