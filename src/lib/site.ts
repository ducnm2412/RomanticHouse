export const SITE = {
  name: "Măng Đen Romantic Homestay",
  shortName: "Romantic",
  phone: "0964102288",
  phoneDisplay: "0964 102 288",
  address: "22 Bà Triệu, thị trấn Măng Đen",
  zalo: "https://zalo.me/0964102288",
  messenger: "https://m.me/mangdenromantic",
  facebook: "https://www.facebook.com/mangdenromantic",
  maps: "https://www.google.com/maps/search/?api=1&query=M%C4%83ng+%C4%91en+Romantic+Homestay+%26+BBQ",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.6844039265247!2d108.29147687389326!3d14.617045685871267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169430629d5939f%3A0xa16c37eefa8ebc33!2sM%C4%83ng%20%C4%91en%20Romantic%20Homestay%20%26%20BBQ!5e0!3m2!1svi!2s!4v1791253700053!5m2!1svi!2s",
} as const;

export const ROOM_NAMES = [
  "Phòng săn mây tại giường",
  "Phòng tiêu chuẩn khách sạn",
  "Bungalow săn mây – sân vườn",
  "Nhà gỗ nguyên căn",
] as const;

export type RoomName = (typeof ROOM_NAMES)[number];

export const GUEST_OPTIONS = [
  { value: "1", label: "1 khách" },
  { value: "2", label: "2 khách" },
  { value: "3", label: "3 khách" },
  { value: "4", label: "4 khách" },
  { value: "5", label: "5 khách" },
  { value: "6", label: "6 khách" },
  { value: "7+", label: "Từ 7 khách" },
] as const;
