import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Ms_Madi,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

const script = Ms_Madi({
  variable: "--font-script-face",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Măng Đen Romantic Homestay – Phòng săn mây, bungalow, nhà gỗ nguyên căn",
  description:
    "Homestay tại 22 Bà Triệu, Măng Đen: phòng săn mây tại giường, phòng tiêu chuẩn khách sạn, bungalow sân vườn và nhà gỗ nguyên căn. Đặt phòng nhanh qua điện thoại hoặc Zalo 0964 102 288.",
  openGraph: {
    title: "Măng Đen Romantic Homestay",
    description:
      "Mở mắt ra là thấy mây. Đặt phòng nhanh qua Zalo 0964 102 288.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${playfair.variable} ${script.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
