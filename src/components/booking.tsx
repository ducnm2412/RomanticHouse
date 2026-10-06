"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { GUEST_OPTIONS, ROOM_NAMES, SITE, type RoomName } from "@/lib/site";

type Fields = {
  checkin: string;
  checkout: string;
  guests: string;
  room: string;
  name: string;
  phone: string;
  note: string;
};

type Booking = Fields & {
  today: string;
  set: (key: keyof Fields, value: string) => void;
};

const BookingContext = createContext<Booking | null>(null);

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toDate = (v: string) => {
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (v: string, days: number) => {
  const d = toDate(v);
  d.setDate(d.getDate() + days);
  return iso(d);
};
const vn = (v: string) => v.split("-").reverse().join("/");

// Ngày hôm nay chỉ có ở trình duyệt: trang được dựng tĩnh nên server trả về rỗng.
const subscribe = () => () => {};
const getToday = () => iso(new Date());
const getServerToday = () => "";

export function BookingProvider({ children }: { children: ReactNode }) {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const [fields, setFields] = useState<Fields>({
    checkin: "",
    checkout: "",
    guests: "2",
    room: ROOM_NAMES[0],
    name: "",
    phone: "",
    note: "",
  });

  const checkin = fields.checkin || (today && addDays(today, 1));
  const checkout = fields.checkout || (checkin && addDays(checkin, 1));
  const set = (key: keyof Fields, value: string) =>
    setFields((f) => ({ ...f, [key]: value }));

  return (
    <BookingContext value={{ ...fields, checkin, checkout, today, set }}>
      {children}
    </BookingContext>
  );
}

function useBooking() {
  const booking = useContext(BookingContext);
  if (!booking) throw new Error("useBooking phải nằm trong BookingProvider");
  return booking;
}

export function BookRoomLink({ room }: { room: RoomName }) {
  const { set } = useBooking();
  return (
    <a
      className="ns-btn px-[18px]"
      href="#dat-phong"
      onClick={() => set("room", room)}
    >
      Đặt phòng
    </a>
  );
}

const labelClass = "text-[13px] font-medium text-muted";

export function BookingForm() {
  const b = useBooking();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const nights =
    b.checkin && b.checkout
      ? Math.round(
          (toDate(b.checkout).getTime() - toDate(b.checkin).getTime()) /
            86400000,
        )
      : 0;
  const datesOk = nights >= 1;
  const phoneOk = b.phone.replace(/\D/g, "").length >= 9;
  const valid = datesOk && phoneOk;
  const errorText = !datesOk
    ? "Ngày trả phòng phải sau ngày nhận phòng. Chọn lại ngày rồi gửi yêu cầu."
    : "Nhập số điện thoại hoặc Zalo để homestay liên hệ lại.";
  const guestText = b.guests === "7+" ? "từ 7 khách" : `${b.guests} khách`;
  const summary = valid
    ? `${b.name ? `${b.name}, ` : ""}${b.phone}. Đặt ${b.room} tại Măng Đen Romantic, ${guestText}, nhận phòng ${vn(b.checkin)}, trả phòng ${vn(b.checkout)} (${nights} đêm).${b.note ? ` Ghi chú: ${b.note}` : ""}`
    : "";

  // Zalo không nhận nội dung soạn sẵn qua link, nên chép sẵn để khách dán vào.
  const copySummary = () => {
    navigator.clipboard?.writeText(summary).then(
      () => setCopied(true),
      () => {},
    );
  };

  return (
    <form
      id="dat-phong"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setCopied(false);
      }}
      className="mt-3 rounded-2xl bg-cream p-3.5 text-ink"
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="f-name" className={labelClass}>
            Họ và tên
          </label>
          <input
            id="f-name"
            className="ns-field"
            type="text"
            autoComplete="name"
            placeholder="Nhập họ tên"
            value={b.name}
            onChange={(e) => b.set("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="f-phone" className={labelClass}>
            SĐT / Zalo
          </label>
          <input
            id="f-phone"
            className="ns-field"
            type="tel"
            autoComplete="tel"
            placeholder="Nhập số điện thoại"
            value={b.phone}
            onChange={(e) => b.set("phone", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="f-room" className={labelClass}>
            Hạng phòng
          </label>
          <select
            id="f-room"
            className="ns-field"
            value={b.room}
            onChange={(e) => b.set("room", e.target.value)}
          >
            {ROOM_NAMES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="f-guests" className={labelClass}>
            Số khách
          </label>
          <select
            id="f-guests"
            className="ns-field"
            value={b.guests}
            onChange={(e) => b.set("guests", e.target.value)}
          >
            {GUEST_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="f-checkin" className={labelClass}>
            Ngày nhận
          </label>
          <input
            id="f-checkin"
            className="ns-field"
            type="date"
            min={b.today}
            value={b.checkin}
            onChange={(e) => b.set("checkin", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="f-checkout" className={labelClass}>
            Ngày trả
          </label>
          <input
            id="f-checkout"
            className="ns-field"
            type="date"
            min={b.checkin}
            value={b.checkout}
            onChange={(e) => b.set("checkout", e.target.value)}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <label htmlFor="f-note" className={labelClass}>
            Ghi chú
          </label>
          <textarea
            rows={1}
            id="f-note"
            className="ns-field"
            placeholder="Ví dụ: đặt BBQ, trang trí phòng"
            value={b.note}
            onChange={(e) => b.set("note", e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="ns-btn mt-3 min-h-11 w-full cursor-pointer rounded-xl text-[15px]"
      >
        Gửi yêu cầu đặt phòng
      </button>
      {sent && !valid && (
        <p
          role="alert"
          className="mt-3 rounded-[10px] bg-[#FBECEE] px-3.5 py-3 text-[14.5px] text-[#7A1626]"
        >
          {errorText}
        </p>
      )}
      {sent && valid && (
        <div
          role="status"
          className="mt-3.5 flex flex-col gap-2.5 rounded-xl border border-sage-line bg-sage p-4"
        >
          <div className="text-[15px] font-semibold">
            Yêu cầu đặt phòng của bạn
          </div>
          <div className="text-[15px]">{summary}</div>
          <div className="text-sm text-muted">
            {copied
              ? "Đã sao chép nội dung. Dán vào khung chat để homestay giữ phòng."
              : "Gửi nội dung này cho homestay để giữ phòng và nhận giá."}
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              className="ns-btn min-h-12 flex-[1_1_140px] bg-forest px-4"
              href={SITE.zalo}
              target="_blank"
              rel="noopener"
              onClick={copySummary}
            >
              Gửi qua Zalo
            </a>
            <a
              className="ns-btn min-h-12 flex-[1_1_140px] bg-forest px-4"
              href={SITE.messenger}
              target="_blank"
              rel="noopener"
              onClick={copySummary}
            >
              Messenger
            </a>
            <a
              className="ns-btn min-h-12 flex-[1_1_140px] border-[1.5px] border-forest bg-white px-4 text-forest"
              href={`tel:${SITE.phone}`}
            >
              Gọi {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
