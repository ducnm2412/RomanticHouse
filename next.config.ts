import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 100 dành cho ảnh hero và ảnh nền tràn màn hình, nơi nén 75 lộ rõ vết mờ.
    qualities: [75, 100],
  },
};

export default nextConfig;
