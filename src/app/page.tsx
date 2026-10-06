import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BookingForm,
  BookingProvider,
  BookRoomLink,
} from "@/components/booking";
import { AutoScroller } from "@/components/auto-scroller";
import { FallingLeaves } from "@/components/leaves";
import { Lightbox } from "@/components/lightbox";
import { RevealOnScroll } from "@/components/reveal";
import { img } from "@/lib/images";
import { SITE, type RoomName } from "@/lib/site";

const rooms: {
  name: RoomName;
  image: StaticImageData;
  alt: string;
  position?: string;
  desc: string;
  suits: string;
  tags: string[];
  // Giá mỗi đêm, ví dụ "650.000đ". Để null thì trang hiện "Liên hệ".
  price: string | null;
}[] = [
  {
    name: "Phòng săn mây tại giường",
    image: img.sanMayTaiGiuong,
    alt: "Giường kê sát cửa kính lớn nhìn ra rừng, trang trí cánh hoa hồng",
    position: "object-[center_62%]",
    desc: "Kéo rèm là thấy mây và rừng.",
    suits: "Cặp đôi",
    tags: ["1 giường đôi", "Cửa kính lớn", "Ban công"],
    price: "650.000đ",
  },
  {
    name: "Phòng tiêu chuẩn khách sạn",
    image: img.tieuChuanViewSan,
    alt: "Phòng tiêu chuẩn hai giường đôi, cửa sổ nhìn ra sân thượng và đồi",
    desc: "Ga trắng, cửa sổ nhìn ra đồi.",
    suits: "Cặp đôi, gia đình, nhóm 2–4 người",
    tags: ["1–2 giường đôi", "Cửa sổ lớn", "View đồi"],
    price: "450.000đ",
  },
  {
    name: "Bungalow săn mây – sân vườn",
    image: img.sanThuong,
    alt: "Sân ngắm mây của homestay lúc chạng vạng",
    desc: "Căn riêng giữa sân vườn.",
    suits: "Cặp đôi, gia đình nhỏ",
    tags: ["Căn riêng", "Sân vườn", "Ngắm mây"],
    price: "850.000đ",
  },
  {
    name: "Nhà gỗ nguyên căn",
    image: img.nhaGo,
    alt: "Phòng ốp gỗ hai giường lớn, cửa kính mở ra ban công nhìn xuống rừng",
    desc: "Trọn căn cho nhóm bạn, gia đình.",
    suits: "Nhóm bạn, gia đình",
    tags: ["2 giường lớn", "Ốp gỗ", "Ban công"],
    price: "1.800.000đ",
  },
];

const stays = [
  {
    name: "Thuê theo đêm",
    image: img.tieuChuanDoi,
    alt: "Phòng một giường đôi, cửa sổ nhìn ra đồi xanh",
    desc: "Ngủ lại một hay nhiều đêm, sáng dậy săn mây.",
    note: "Hợp với khách du lịch",
  },
  {
    name: "Nghỉ ngắn ngày",
    image: img.tieuChuan2Giuong,
    alt: "Phòng hai giường đôi với ga trắng và gối thổ cẩm",
    desc: "Ghé Măng Đen và cần một phòng nghỉ chân.",
    note: "Hợp với khách đi ngang",
  },
  {
    name: "Thuê nguyên căn",
    image: img.nhaGo,
    alt: "Bên trong nhà gỗ nguyên căn",
    desc: "Cả nhà gỗ dành riêng cho nhóm của bạn.",
    note: "Hợp với nhóm bạn, gia đình",
  },
];

const discoveries = [
  {
    title: "Vườn hồng trĩu quả",
    desc: "Hồng chín vàng dưới trời xanh",
    image: img.vuonHong,
    alt: "Chùm hồng vàng trên cành dưới trời xanh",
  },
  {
    title: "Dâu chín trên luống",
    desc: "Ghé vườn, hái dâu tận tay",
    image: img.dauTay,
    alt: "Hai quả dâu tây chín đỏ trên luống",
  },
  {
    title: "Bí ngô đủ sắc",
    desc: "Nông sản tươi của vùng cao",
    image: img.biDo,
    alt: "Những quả bí đỏ mini xếp đầy rổ",
  },
];

const gallery = [
  {
    src: img.bienMay,
    alt: "Biển mây phủ thung lũng Măng Đen lúc bình minh",
    caption: "Sáng sớm săn mây",
    tilt: "-rotate-2",
  },
  {
    src: img.sanMayTaiGiuong,
    alt: "Giường trang trí cánh hoa hồng bên cửa kính nhìn ra rừng",
    caption: "Nằm giường ngắm rừng",
    tilt: "rotate-[1.5deg]",
  },
  {
    src: img.nhaGo,
    alt: "Phòng ốp gỗ hai giường lớn có ban công",
    caption: "Góc nhà gỗ ấm",
    tilt: "-rotate-1",
  },
  {
    src: img.bangHieuDem,
    alt: "Bảng hiệu Măng Đen Romantic Homestay sáng đèn buổi tối",
    caption: "Romantic lên đèn",
    tilt: "rotate-2",
  },
  {
    src: img.banTiec,
    alt: "Bàn tiệc gỗ dài bày sẵn lẩu và rau giữa sân vườn",
    caption: "Bàn tiệc sân vườn",
    tilt: "-rotate-[1.5deg]",
  },
  {
    src: img.sanThuong,
    alt: "Sân ngắm mây lúc chạng vạng",
    caption: "Chạng vạng trên sân",
    tilt: "rotate-1",
  },
];

const arrow = <span aria-hidden="true">→</span>;

const faqs = [
  {
    q: "Homestay có những hạng phòng nào?",
    a: "Có bốn hạng: phòng săn mây tại giường, phòng tiêu chuẩn khách sạn, bungalow săn mây – sân vườn và nhà gỗ nguyên căn.",
  },
  {
    q: "Giá phòng bao nhiêu một đêm?",
    a: `Từ 450.000đ một đêm cho phòng tiêu chuẩn, đến 1.800.000đ cho nhà gỗ nguyên căn. Giá có thể đổi theo ngày, nhắn Zalo hoặc gọi ${SITE.phoneDisplay} để nhận giá đúng ngày bạn đi.`,
  },
  {
    q: "Có nhận thuê phòng ngắn ngày không?",
    a: "Có. Homestay nhận thuê theo đêm và nghỉ ngắn ngày. Bạn báo giờ đến để homestay sắp phòng.",
  },
  {
    q: "Homestay có phục vụ BBQ, lẩu không?",
    a: "Có. Bạn báo trước số người để homestay chuẩn bị nguyên liệu và bàn tại sân vườn.",
  },
  {
    q: "Homestay có nhận trang trí phòng không?",
    a: "Có. Bạn báo dịp cần trang trí khi đặt phòng để homestay chuẩn bị trước.",
  },
  {
    q: "Homestay nằm ở đâu?",
    a: `Tại ${SITE.address}. Bản đồ chỉ đường có ở cuối trang.`,
  },
];

function Icon({
  size,
  stroke = "#1F3D2F",
  width = 1.5,
  className,
  children,
}: {
  size: number;
  stroke?: string;
  width?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

const pinPath = (
  <>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.500" />
  </>
);
const phonePath = (
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
);
const bedPath = (
  <>
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
    <path d="M3 15h18" />
    <path d="M6 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
    <path d="M4 18v2M20 18v2" />
  </>
);
const cloudPath = (
  <path d="M7 18a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17.200 9.200 4.400 4.400 0 0 1 17.500 18z" />
);
const flamePath = (
  <path d="M12 21c-3.500 0-6-2.500-6-5.800 0-2.600 1.700-4.300 3-6.200.6 1.600 1.400 2.300 2.200 2.600C11 8.500 11.800 5.500 14 3c.3 3 4 5.600 4 10.200 0 4.300-2.500 7.800-6 7.800z" />
);

function Heading({
  no,
  label,
  children,
}: {
  no: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="ns-eyebrow">
        <span>{no}</span>
        <i />
        <span>{label}</span>
      </div>
      <h2 className="ns-h2">{children}</h2>
    </>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#FFFCC0] ring-1 ring-gold/60">
        <Image
          src={img.logo}
          alt=""
          fill
          sizes="48px"
          className="scale-[1.9] object-cover object-[50%_28%]"
        />
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span className="font-display text-xl font-semibold tracking-[0.04em] whitespace-nowrap uppercase min-[400px]:text-2xl">
          Măng Đen
        </span>
        <span className="self-end font-script text-[26px] leading-none text-gold-soft">
          Romantic
        </span>
      </span>
    </span>
  );
}

// Đường gợn sóng nối hai section: tô bằng màu nền của section nằm phía dưới
// (hoặc phía trên khi lật bằng `flip`).
function Wave({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`ns-wave block h-[clamp(24px,4vw,56px)] w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        className="ns-wave-back"
        fill="currentColor"
        opacity="0.45"
        d="M0 38 C 200 0 420 70 720 34 C 1020 -2 1240 60 1440 22 V90 H0 Z"
      />
      <path
        fill="currentColor"
        d="M0 56 C 240 100 480 8 720 44 C 960 80 1200 14 1440 50 V90 H0 Z"
      />
    </svg>
  );
}

// Ảnh phong cảnh làm nền cho section. Lớp phủ tối chỉ đậm ở phía trên để
// tiêu đề trắng đọc được; mép section là sóng màu kem.
function Backdrop({
  src,
  position = "",
  noBottomEdge,
}: {
  src: StaticImageData;
  position?: string;
  noBottomEdge?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        quality={100}
        className={`ns-parallax object-cover ${position}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0.62)_0%,rgba(22,41,31,0.2)_42%,rgba(22,41,31,0.1)_100%)]" />
      <Wave flip className="absolute inset-x-0 -top-px text-leaf" />
      {!noBottomEdge && (
        <Wave className="absolute inset-x-0 -bottom-px text-leaf" />
      )}
    </>
  );
}

function PineBranch({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="64"
      height="28"
      viewBox="0 0 64 28"
      fill="none"
      stroke="#EEF6E6"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className={`shrink-0 max-[559px]:hidden ${flip ? "-scale-x-100" : ""}`}
    >
      <path d="M2 14h60" />
      <path d="M14 14l-7-8M24 14l-7-9M34 14l-7-9M44 14l-7-8M54 14l-6-7" />
      <path d="M14 14l-7 8M24 14l-7 9M34 14l-7 9M44 14l-7 8M54 14l-6 7" />
    </svg>
  );
}

export default function Home() {
  return (
    <BookingProvider>
      <RevealOnScroll />
      <Lightbox />
      <FallingLeaves />
      <section
        id="top"
        className="ns-onphoto relative flex h-svh min-h-[540px] flex-col overflow-hidden bg-deep text-white"
      >
        <Image
          src={img.nhaGo}
          alt="Phòng nhà gỗ hai giường lớn, cửa kính mở ra ban công nhìn xuống rừng Măng Đen"
          fill
          preload
          loading="eager"
          sizes="100vw"
          quality={100}
          placeholder="blur"
          className="ns-kenburns object-cover object-[42%_45%] nav:object-[center_45%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0.55)_0%,rgba(22,41,31,0.42)_45%,rgba(22,41,31,0.72)_100%)]" />

        <header className="relative z-2">
          <div className="ns-container flex items-center justify-between gap-5 py-[18px]">
            <Link href="/" aria-label={`${SITE.name} – về trang chủ`}>
              <Wordmark />
            </Link>
            <nav
              aria-label="Điều hướng chính"
              className="hidden gap-[30px] text-[15px] font-medium nav:flex"
            >
              <a href="#gioi-thieu">Giới thiệu</a>
              <a href="#phong">Phòng nghỉ</a>
              <a href="#tien-nghi">Tiện nghi</a>
              <a href="#hinh-anh">Hình ảnh</a>
              <a href="#bang-gia">Bảng giá</a>
              <a href="#lien-he">Liên hệ</a>
            </nav>
            <a
              className="ns-btn rounded-full bg-gold-soft px-6 text-forest"
              href="#dat-phong"
            >
              Đặt phòng
            </a>
          </div>
        </header>

        <div className="ns-container ns-rise flex w-full grow flex-col items-center justify-center min-h-0 pb-[140px] text-center nav:pb-[clamp(70px,12vh,116px)] [text-shadow:0_2px_18px_rgba(22,41,31,0.55)]">
          <div
            role="img"
            aria-label={SITE.name}
            className="flex flex-col items-center text-cream"
          >
            <svg
              viewBox="0 0 120 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-[clamp(84px,min(14vw,19vh),190px)] drop-shadow-[0_2px_10px_rgba(22,41,31,0.5)]"
            >
              <path d="M4 58 60 6l56 52" />
              <path d="M26 37V16h10v12" />
              <path
                d="M51 50V40a9 9 0 0 1 18 0v10zM60 31v19M51 41h18"
                strokeWidth="3"
              />
            </svg>
            <span className="-mt-1 font-display text-[clamp(40px,min(9.6vw,14.5vh),128px)] leading-[1.05] font-medium tracking-[0.02em] uppercase">
              Măng Đen
            </span>
            <span className="-mt-[0.32em] font-script text-[clamp(46px,min(9.4vw,14.5vh),128px)] leading-[0.9] text-gold-soft">
              Romantic
            </span>
          </div>
          <p className="mt-[clamp(10px,3vh,34px)] text-[clamp(11px,1.15vw,15px)] font-medium tracking-[0.24em] uppercase">
            Homestay · Săn mây giữa rừng thông
          </p>
          <h1 className="mt-[clamp(6px,1.4vh,12px)] font-display text-[clamp(26px,min(4.6vw,6.6vh),58px)] leading-[1.2] font-medium text-balance">
            Mở mắt ra là thấy mây,
            <br />
            ấm áp giữa rừng thông
          </h1>
          <p className="mt-[clamp(8px,1.8vh,16px)] max-w-[34em] text-[clamp(14px,min(1.5vw,2.3vh),18px)] text-[#EEF1EA]">
            Phòng săn mây tại giường, bungalow sân vườn và nhà gỗ nguyên căn
            tại {SITE.address}.
          </p>
        </div>

        <a
          href="#gioi-thieu"
          aria-label="Cuộn xuống phần giới thiệu"
          className="absolute bottom-[88px] left-1/2 nav:bottom-[clamp(26px,5vh,56px)] z-2 flex h-11 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-white/85 pt-2"
        >
          <span className="ns-cue-dot h-2 w-[3px] rounded-full bg-white" />
        </a>
        <Wave className="absolute inset-x-0 -bottom-px z-1 text-leaf" />
      </section>

      <div className="ns-paper">
        <div className="ns-reveal ns-container flex items-center justify-center gap-3.5 pt-[clamp(16px,2.5vw,28px)]">
          <PineBranch />
          <div className="flex items-center justify-center gap-x-[clamp(8px,3vw,32px)] rounded-full bg-forest px-[clamp(16px,4vw,40px)] py-2.5 font-script text-[clamp(20px,3.2vw,36px)] leading-[1.2] whitespace-nowrap text-cream">
            <span>Săn mây</span>
            <span className="text-gold" aria-hidden="true">
              +
            </span>
            <span>Sân vườn</span>
            <span className="text-gold" aria-hidden="true">
              +
            </span>
            <span>Nhà gỗ</span>
          </div>
          <PineBranch flip />
        </div>

        <section
          id="gioi-thieu"
          className="pt-[clamp(28px,4vw,48px)] pb-[clamp(20px,3vw,36px)]"
        >
          <div className="ns-container flex flex-wrap items-center gap-[clamp(32px,6vw,80px)]">
            <div className="ns-reveal ns-from-left ns-ongreen min-w-0 flex-[1_1_380px]">
              <Heading no="01" label="Về Romantic">
                Luôn đổi mới để hợp ý khách
              </Heading>
              <p className="mt-3.5 max-w-[32em] text-muted">
                Măng Đen Romantic luôn phát triển và thay đổi theo thị hiếu của
                khách. Homestay đón khách du lịch, cặp đôi, nhóm bạn, gia đình
                và cả khách chỉ cần một phòng nghỉ ngắn ngày.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <Icon size={40}>{bedPath}</Icon>
                  <div className="text-sm leading-[1.3] font-semibold sm:text-base">
                    Bốn hạng phòng
                  </div>
                  <div className="text-[12.5px] leading-snug text-muted sm:text-sm">
                    Từ phòng đôi đến nhà gỗ nguyên căn
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Icon size={40}>{cloudPath}</Icon>
                  <div className="text-sm leading-[1.3] font-semibold sm:text-base">
                    Săn mây tại chỗ
                  </div>
                  <div className="text-[12.5px] leading-snug text-muted sm:text-sm">
                    Ngắm mây từ giường và sân thượng
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Icon size={40}>{pinPath}</Icon>
                  <div className="text-sm leading-[1.3] font-semibold sm:text-base">
                    22 Bà Triệu
                  </div>
                  <div className="text-[12.5px] leading-snug text-muted sm:text-sm">
                    Ngay thị trấn Măng Đen
                  </div>
                </div>
              </div>
            </div>
            <div className="ns-reveal ns-from-right relative min-w-0 flex-[1_1_380px] pr-[clamp(20px,4vw,44px)] pb-[clamp(28px,4vw,48px)]">
              <Image
                src={img.bangHieuDem}
                alt="Bảng hiệu đèn Măng Đen Romantic Homestay sáng trong đêm"
                sizes="(min-width: 860px) 560px, 100vw"
                className="ns-zoomable aspect-4/3 w-full rounded-[36px] object-cover object-[62%_50%]"
              />
              <div className="absolute right-0 bottom-0 w-[34%] rotate-[4deg] bg-white px-2 pt-2 pb-[22px] shadow-[0_16px_30px_-14px_rgba(22,41,31,0.55)]">
                <Image
                  src={img.sanThuong}
                  alt="Sân ngắm mây của homestay lúc chạng vạng"
                  sizes="200px"
                  className="ns-zoomable aspect-3/4 w-full object-cover object-[78%_50%]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="phong"
        className="ns-onphoto relative overflow-hidden bg-deep py-[clamp(64px,8vw,116px)]"
      >
        <Backdrop src={img.bienMay} position="object-[center_55%]" />
        <div className="ns-container relative">
          <Heading no="02" label="Phòng nghỉ">
            Phòng cho mọi chuyến đi
          </Heading>
          <AutoScroller className="ns-scroller mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto max-nav:pb-2 nav:grid nav:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] nav:gap-[22px] nav:overflow-visible">
            {rooms.map((room, i) => (
              <article
                key={room.name}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="ns-reveal flex flex-col overflow-hidden rounded-[14px] border border-line bg-white shadow-[0_14px_28px_-24px_rgba(22,41,31,0.5)] max-nav:w-[82%] max-nav:shrink-0 max-nav:snap-start min-[560px]:max-nav:w-[46%]"
              >
                <Image
                  src={room.image}
                  alt={room.alt}
                  sizes="(min-width: 860px) 300px, 100vw"
                  className={`ns-zoomable ns-zoom aspect-16/10 w-full object-cover ${room.position ?? ""}`}
                />
                <div className="flex grow flex-col gap-2.5 px-[18px] pt-4 pb-[18px]">
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <div className="text-sm text-muted">{room.desc}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {room.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-sage px-2.5 py-[3px] text-[13px] text-forest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <span className="flex flex-col text-[13px] leading-tight text-muted">
                      Từ / đêm
                      <strong className="text-[17px] font-semibold text-wine">
                        {room.price ?? "Liên hệ"}
                      </strong>
                    </span>
                    <BookRoomLink room={room.name} />
                  </div>
                </div>
              </article>
            ))}
          </AutoScroller>
        </div>
      </section>

      <section id="tien-nghi" className="ns-paper ns-section">
        <div className="ns-container">
          <Heading no="03" label="Tiện nghi">
            Những khoảnh khắc đáng nhớ
          </Heading>
          <div className="mt-6 flex flex-wrap items-center gap-[clamp(28px,5vw,64px)]">
            <div className="ns-reveal ns-from-left relative min-w-0 flex-[1_1_340px] pr-[clamp(16px,3vw,36px)] pb-[clamp(16px,2vw,24px)]">
              <Image
                src={img.sanMayTaiGiuong}
                alt="Giường trang trí cánh hoa hồng và khăn xếp thiên nga bên cửa kính nhìn ra rừng"
                sizes="(min-width: 860px) 560px, 100vw"
                className="ns-zoomable aspect-16/10 w-full rounded-2xl object-cover object-[center_62%]"
              />
              <div className="absolute right-0 bottom-0 w-[30%] rotate-[5deg] bg-white px-1.5 pt-1.5 pb-4 shadow-[0_14px_26px_-12px_rgba(22,41,31,0.55)]">
                <Image
                  src={img.bbq}
                  alt="Nguyên liệu BBQ và lẩu: cá, thịt ướp, bắp, đậu bắp, rau rừng"
                  sizes="180px"
                  className="ns-zoomable aspect-square w-full object-cover"
                />
              </div>
            </div>
            <div className="grid min-w-0 flex-[1_1_360px] grid-cols-2 gap-2.5 sm:gap-3.5">
              {[
                {
                  title: "Trang trí phòng theo dịp",
                  desc: "Kỷ niệm, sinh nhật, cầu hôn",
                  icon: (
                    <path d="M12 20s-7-4.400-7-9.500A3.900 3.900 0 0 1 12 8a3.900 3.900 0 0 1 7 2.500C19 15.600 12 20 12 20z" />
                  ),
                },
                {
                  title: "BBQ và lẩu sân vườn",
                  desc: "Báo trước số người, homestay lo bếp",
                  icon: flamePath,
                },
                {
                  title: "Ngắm mây từ sân thượng",
                  desc: "Sáng có mây, chiều có hoàng hôn",
                  icon: (
                    <>
                      <path d="M3 19l6-9 4 5 3-4 5 8z" />
                      <circle cx="17" cy="6" r="2" />
                    </>
                  ),
                },
                {
                  title: "Bàn tiệc cho đoàn",
                  desc: "Bàn gỗ dài ngoài sân cho nhóm đông",
                  icon: (
                    <>
                      <path d="M3 9h18" />
                      <path d="M6 9v10M18 9v10" />
                      <path d="M9 5h6" />
                    </>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="ns-reveal flex flex-col gap-1.5 rounded-[14px] border border-sage-line bg-sage p-3.5 sm:p-5"
                >
                  <Icon size={34}>{item.icon}</Icon>
                  <div className="text-sm leading-[1.3] font-semibold sm:text-base">
                    {item.title}
                  </div>
                  <div className="text-[12.5px] leading-snug text-muted sm:text-sm">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="luu-tru"
        className="ns-onphoto relative overflow-hidden bg-deep py-[clamp(64px,8vw,116px)]"
      >
        <Backdrop
          src={img.sanThuong}
          position="object-[center_40%]"
          noBottomEdge
        />
        <div className="ns-container relative">
          <Heading no="04" label="Lưu trú">
            Ba cách ở tại Romantic
          </Heading>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
            {stays.map((stay, i) => (
              <article
                key={stay.name}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="ns-reveal flex items-center gap-4 rounded-[14px] border border-line bg-white p-3.5"
              >
                <Image
                  src={stay.image}
                  alt={stay.alt}
                  sizes="104px"
                  className="ns-zoomable h-[136px] w-[104px] shrink-0 rounded-[10px] object-cover"
                />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <h3 className="text-lg font-semibold">{stay.name}</h3>
                  <div className="text-sm text-muted">{stay.desc}</div>
                  <div className="text-sm font-medium">{stay.note}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="ns-torn">
        <div className="ns-torn-rim" />
        <section
          id="mang-den"
          className="ns-onphoto relative overflow-hidden text-white"
        >
          <div className="ns-torn-top absolute inset-0 bg-deep">
            <Image
              src={img.banTiec}
              alt="Sân vườn homestay lên đèn, bàn tiệc gỗ dài bày sẵn"
              fill
              sizes="100vw"
              quality={100}
              className="ns-parallax object-cover object-[center_22%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,41,31,0.86)_0%,rgba(22,41,31,0.55)_48%,rgba(22,41,31,0.25)_100%)]" />
          </div>
          <div className="ns-container relative flex flex-wrap items-center gap-[clamp(28px,5vw,64px)] py-[clamp(72px,10vw,140px)]">
            <div className="ns-reveal ns-from-left min-w-0 flex-[1_1_320px]">
              <div className="text-[13px] font-medium tracking-[0.22em] text-gold-soft uppercase">
                Trải nghiệm Măng Đen
              </div>
              <h2 className="mt-3 font-display text-[clamp(34px,4.6vw,56px)] leading-[1.1] font-semibold">
                Măng Đen
                <br />
                đang chờ bạn
              </h2>
              <p className="mt-4 max-w-[26em] text-[#EEF1EA]">
                Biển mây buổi sớm, vườn hồng, luống dâu và những rổ bí đủ màu.
                Homestay sẵn sàng gợi ý lịch trình cho bạn.
              </p>
              <a
                href={SITE.zalo}
                target="_blank"
                rel="noopener"
                className="ns-btn mt-6 gap-2.5 rounded-full bg-cream px-6 text-forest"
              >
                Nhờ homestay gợi ý lịch trình {arrow}
              </a>
            </div>
            <div className="grid min-w-0 flex-[1.3_1_420px] grid-cols-2 items-start nav:grid-cols-3 gap-4">
              {discoveries.map((d, i) => (
                <article
                  key={d.title}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  className={`ns-reveal overflow-hidden rounded-[14px] bg-cream text-ink shadow-[0_22px_40px_-22px_rgba(0,0,0,0.75)] ${i === 1 ? "nav:mt-8" : ""} ${i === 2 ? "max-nav:col-span-2" : ""}`}
                >
                  <Image
                    src={d.image}
                    alt={d.alt}
                    sizes="(min-width: 860px) 220px, 50vw"
                    className={`ns-zoomable ns-zoom aspect-4/3 w-full object-cover ${i === 2 ? "max-nav:aspect-16/7" : ""}`}
                  />
                  <div className="px-4 pt-3 pb-4">
                    <h3 className="font-display text-lg font-semibold text-forest">
                      {d.title}
                    </h3>
                    <div className="mt-1 text-[13.5px] leading-snug text-muted">
                      {d.desc}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <Wave className="absolute inset-x-0 -bottom-px text-leaf" />
        </section>
      </div>

      <div className="ns-paper">
        <section id="hinh-anh" className="ns-section">
          <div className="ns-container">
            <div className="ns-reveal text-center">
              <div className="ns-eyebrow justify-center">
                <span>06</span>
                <i />
                <span>Hình ảnh</span>
              </div>
              <h2 className="ns-h2">Một góc Măng Đen của Romantic</h2>
            </div>
            <div className="mx-auto mt-8 grid max-w-[900px] grid-cols-2 gap-x-[clamp(14px,3vw,36px)] gap-y-[clamp(26px,4vw,44px)] nav:grid-cols-3">
              {gallery.map((shot, i) => (
                <figure
                  key={shot.caption}
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                  className={`ns-reveal ns-zoom-in ns-polaroid relative bg-white px-[clamp(7px,1vw,11px)] pt-[clamp(7px,1vw,11px)] pb-2 shadow-[0_18px_30px_-16px_rgba(22,41,31,0.55)] ${shot.tilt}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 h-6 w-[34%] -translate-x-1/2 -rotate-2 bg-[#E6CF95]/90 shadow-sm"
                  />
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    sizes="(min-width: 860px) 280px, 46vw"
                    className="ns-zoomable aspect-[5/4] w-full object-cover"
                  />
                  <figcaption className="pt-1.5 text-center font-script text-[clamp(20px,2.6vw,28px)] leading-[1.25] text-forest">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full border-[1.5px] border-white px-6 text-[15px] font-semibold text-white hover:bg-white hover:text-forest"
              >
                Xem thêm hình ảnh {arrow}
              </a>
            </div>
          </div>
        </section>

        <section id="bang-gia" className="ns-section">
          <div className="ns-container">
            <Heading no="07" label="Bảng giá">
              Giá phòng theo từng hạng
            </Heading>
            <AutoScroller className="ns-scroller mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-[22px] bg-sage p-[clamp(14px,2vw,22px)] nav:grid nav:grid-cols-4 nav:gap-4 nav:overflow-visible">
              {rooms.map((room, i) => (
                <div
                  key={room.name}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="ns-reveal flex flex-col gap-2 rounded-xl bg-cream p-5 max-nav:w-[78%] max-nav:shrink-0 max-nav:snap-center min-[560px]:max-nav:w-[46%]"
                >
                  <h3 className="font-display text-lg leading-snug font-semibold text-forest">
                    {room.name}
                  </h3>
                  <div className="text-sm text-muted">Hợp với: {room.suits}</div>
                  <div className="mt-auto flex flex-col pt-3 text-[13px] text-muted">
                    Từ / đêm
                    <strong className="text-xl font-semibold text-wine">
                      {room.price ?? "Đang cập nhật"}
                    </strong>
                  </div>
                </div>
              ))}
            </AutoScroller>
            <div className="ns-reveal mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="ns-ongreen max-w-[34em] text-muted">
                Muốn biết giá đúng ngày bạn đi hoặc giá nghỉ ngắn ngày? Nhắn
                Zalo, homestay báo giá ngay.
              </p>
              <a
                href={SITE.zalo}
                target="_blank"
                rel="noopener"
                className="ns-btn bg-forest"
              >
                Nhận giá qua Zalo
              </a>
            </div>
          </div>
        </section>
      </div>

      <section className="ns-onphoto ns-compact relative overflow-hidden bg-black py-[clamp(48px,5vw,68px)]">
        <Image
          src={img.bangHieuDem}
          alt=""
          fill
          sizes="100vw"
          className="ns-parallax object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <Wave flip className="absolute inset-x-0 -top-px text-leaf" />
        <Wave className="absolute inset-x-0 -bottom-px text-leaf" />
        <div className="ns-container relative grid items-start gap-[clamp(28px,3.5vw,44px)] nav:grid-cols-[1fr_1.05fr]">
          <div className="ns-reveal nav:pt-[clamp(14px,1.6vw,20px)]">
            <div className="ns-eyebrow">
              <span>08</span>
              <i />
              <span>Hỏi đáp</span>
            </div>
            <h2 className="ns-h2">Những câu hỏi thường gặp</h2>
            <div className="mt-3.5 flex flex-col gap-1.5">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="ns-faq rounded-[10px] border border-line bg-white"
                >
                  <summary className="flex min-h-10 items-center justify-between gap-3 px-3.5 py-1 text-[14.5px] font-medium">
                    <span>{faq.q}</span>
                    <span
                      className="ns-plus text-[22px] leading-none text-wine"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-3.5 pb-3 text-[14.5px] text-muted">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div
            id="khoi-dat-phong"
            className="ns-reveal ns-ondark rounded-[22px] border border-white/15 bg-black/55 p-[clamp(14px,1.6vw,20px)] text-[#F4EFE2] backdrop-blur-sm"
          >
            <div className="ns-eyebrow text-mist">
              <span>09</span>
              <i className="bg-mist!" />
              <span>Đặt phòng</span>
            </div>
            <h2 className="ns-h2 text-white">Gửi yêu cầu đặt phòng</h2>
            <BookingForm />
          </div>
        </div>
      </section>

      <footer
        id="lien-he"
        className="ns-ondark ns-footer bg-leaf pt-4 text-[14.5px] text-[#EEF6E6]"
      >
        <div className="ns-container grid gap-x-10 gap-y-7 nav:grid-cols-[1.1fr_1.2fr_1.3fr]">
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/"
              aria-label={`${SITE.name} – về trang chủ`}
              className="text-white!"
            >
              <Wordmark />
            </Link>
            <span>Homestay, dịch vụ lưu trú tại Măng Đen</span>
            <div className="flex flex-wrap gap-x-5">
              {[
                ["Facebook", SITE.facebook],
                ["Messenger", SITE.messenger],
                ["Zalo", SITE.zalo],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center text-[#F4EFE2] underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="font-display text-lg font-semibold text-white">
              Liên hệ
            </div>
            <div className="flex gap-2.5">
              <Icon
                size={18}
                stroke="#F1D58F"
                width={1.8}
                className="mt-[3px] shrink-0"
              >
                {pinPath}
              </Icon>
              <span>{SITE.address}</span>
            </div>
            <div className="flex gap-2.5">
              <Icon
                size={18}
                stroke="#F1D58F"
                width={1.8}
                className="mt-[3px] shrink-0"
              >
                {phonePath}
              </Icon>
              <span>
                SĐT / Zalo:{" "}
                <a
                  href={`tel:${SITE.phone}`}
                  className="font-semibold text-white underline"
                >
                  {SITE.phoneDisplay}
                </a>
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-sage">
            <iframe
              src={SITE.mapsEmbed}
              title={`Bản đồ ${SITE.name}, ${SITE.address}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="block h-[200px] w-full border-0"
            />
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener"
              className="absolute right-2 bottom-2 rounded-lg bg-white px-3 py-1.5 text-[13px] font-semibold text-forest! shadow-md"
            >
              Mở Google Maps {arrow}
            </a>
          </div>
        </div>
        <div className="ns-container mt-6 border-t border-white/25 pt-4 text-[13.5px]">
          © 2026 {SITE.name}
        </div>
      </footer>

      <a
        className="ns-btn fixed right-6 bottom-[100px] z-30 hidden size-16 rounded-full border-[3px] border-white bg-forest p-0 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.55)] nav:flex"
        href={SITE.messenger}
        target="_blank"
        rel="noopener"
        aria-label="Nhắn Messenger cho Măng Đen Romantic"
      >
        <Icon size={28} stroke="#fff" width={1.8}>
          <path d="M12 3c-5 0-9 3.700-9 8.300 0 2.600 1.300 4.900 3.300 6.400V21l3.100-1.700c.8.200 1.700.300 2.600.300 5 0 9-3.700 9-8.300S17 3 12 3z" />
          <path d="M7.500 13l3-3.200 2.500 2.200 3.500-2.500" />
        </Icon>
      </a>
      <a
        className="ns-btn fixed right-6 bottom-6 z-30 hidden size-16 rounded-full border-[3px] border-white bg-[#0A63D8] p-0 text-base shadow-[0_12px_24px_-10px_rgba(0,0,0,0.55)] nav:flex"
        href={SITE.zalo}
        target="_blank"
        rel="noopener"
        aria-label="Nhắn Zalo cho Măng Đen Romantic"
      >
        Zalo
      </a>

      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-white px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] text-[15px] font-semibold shadow-[0_-10px_24px_-18px_rgba(22,41,31,0.5)] nav:hidden">
        <a
          href={`tel:${SITE.phone}`}
          className="flex min-h-[50px] flex-[1_1_0] items-center justify-center rounded-xl border-[1.5px] border-forest text-forest"
        >
          Gọi
        </a>
        <a
          href={SITE.zalo}
          target="_blank"
          rel="noopener"
          className="flex min-h-[50px] flex-[1_1_0] items-center justify-center rounded-xl border-[1.5px] border-forest text-forest"
        >
          Zalo
        </a>
        <a
          href={SITE.messenger}
          target="_blank"
          rel="noopener"
          className="flex min-h-[50px] flex-[1.5_1_0] items-center justify-center rounded-xl border-[1.5px] border-forest text-forest"
        >
          Messenger
        </a>
        <a
          href="#dat-phong"
          className="flex min-h-[50px] flex-[1.6_1_0] items-center justify-center rounded-xl bg-wine text-white"
        >
          Đặt phòng
        </a>
      </div>
    </BookingProvider>
  );
}
