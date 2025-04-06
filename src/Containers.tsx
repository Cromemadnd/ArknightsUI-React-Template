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
      className={`flex gap-${gap} ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

export function LargeContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function ThreeDContainer({
  children,
  rotx,
  roty,
  className = "",
}: {
  children: React.ReactNode;
  rotx: number;
  roty: number;
  className?: string;
}) {
  return (
    <div
      style={{
        transform: `perspective(30rem) rotateY(${roty}deg) rotateX(${rotx}deg)`,
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
