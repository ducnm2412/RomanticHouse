// Lá rơi phủ toàn trang. Vị trí, cỡ và nhịp của từng lá được sinh sẵn một lần
// để server và trình duyệt vẽ giống nhau. Lớp này không nhận chuột hay chạm,
// nằm trên nền các section (z-index 1) nhưng dưới nội dung (.ns-container, 2).
const LEAVES = [
  { left: 52, size: 22, fall: 19.6, sway: 4.2, delay: -9.0, color: "#E3C46F" },
  { left: 8, size: 21, fall: 14.0, sway: 2.8, delay: -16.2, color: "#A9432F" },
  { left: 80, size: 24, fall: 12.6, sway: 2.6, delay: -10.6, color: "#D9B25A" },
  { left: 37, size: 23, fall: 19.4, sway: 3.6, delay: -12.8, color: "#8FA35A" },
  { left: 93, size: 25, fall: 13.5, sway: 4.1, delay: -10.3, color: "#D9B25A" },
  { left: 22, size: 14, fall: 19.5, sway: 2.6, delay: -4.2, color: "#D9B25A" },
  { left: 66, size: 26, fall: 17.7, sway: 3.3, delay: -6.2, color: "#D9B25A" },
];

export function FallingLeaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-1 overflow-hidden"
    >
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className={`ns-leaf ${i % 2 ? "max-nav:hidden" : ""}`}
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.fall}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={leaf.size * 1.5}
            height={leaf.size * 1.5}
            style={{
              color: leaf.color,
              animationDuration: `${leaf.sway}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <path
              fill="currentColor"
              d="M12 2C7 5 4 9.5 4 14c0 3 2 5.500 5 6.5L12 22l3-1.5c3-1 5-3.5 5-6.5 0-4.500-3-9-8-12z"
            />
            <path
              d="M12 5v15M12 10l-3.5-2M12 13l4-2.5M12 16l-3-1.5"
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
