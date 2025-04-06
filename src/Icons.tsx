export function RecuritIcon() {
  return (
    <svg viewBox="0 0 1024 1024" className="w-6">
      <polyline
        points="32,320 32,32 320,32"
        fill="none"
        stroke="#888888"
        strokeWidth="64"
      />
      <polyline
        points="992,320 992,32 704,32"
        fill="none"
        stroke="#888888"
        strokeWidth="64"
      />
      <polyline
        points="992,704 992,992 704,992"
        fill="none"
        stroke="#888888"
        strokeWidth="64"
      />
      <polyline
        points="32,704 32,992 320,992"
        fill="none"
        stroke="#888888"
        strokeWidth="64"
      />

      <line
        x1="0"
        y1="512"
        x2="320"
        y2="512"
        stroke="#888888"
        strokeWidth="72"
      />
      <line
        x1="704"
        y1="512"
        x2="1024"
        y2="512"
        stroke="#888888"
        strokeWidth="72"
      />

      <path
        d="M 320,128 320,320 384,352 640,352 704,320 704,128 654,128 654,180 596,180 596,128 448,128 448,180 380,180 380,128 320,128 Z

              M 384,384 384,632 640,632 640,384 384,384 Z

              M 364,660
              C 270,880 220,900 220,900
              L 804,900
              C 754,880 754,860 660,660 Z"
        fill="#888888"
      />
    </svg>
  );
}

export function BatteryIcon({ batteryLevel = 0 }: { batteryLevel?: number }) {
  return (
    <svg viewBox="0 0 1024 1024" className="w-8">
      <rect
        x="128"
        y="384"
        width="768"
        height="384"
        fill="none"
        stroke="white"
        strokeWidth="64"
      />
      <rect x="896" y="448" width="96" height="256" fill="white" />

      {batteryLevel >= 25 && (
        <rect x="220" y="448" width="128" height="256" fill="white" />
      )}
      {batteryLevel >= 50 && (
        <rect x="420" y="448" width="128" height="256" fill="white" />
      )}
      {batteryLevel >= 75 && (
        <rect x="620" y="448" width="128" height="256" fill="white" />
      )}
    </svg>
  );
}

export function LevelIcon() {
  return (
    <svg viewBox="0 0 208 208" className="mt-48 ml-12 h-36 w-36">
      <circle
        cx="104"
        cy="104"
        r="96"
        fill="none"
        stroke="#ffffff33"
        strokeWidth={8}
      ></circle>
      <text
        x="104"
        y="120"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="80"
        fontWeight="bold"
      >
        120
      </text>
      <text x="104" y="168" textAnchor="middle" fill="#ffffff" fontSize="32">
        LV
      </text>
    </svg>
  );
}
