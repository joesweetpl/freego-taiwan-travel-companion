"use client";

import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Luggage,
  MapPin,
  ShieldCheck,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  conciergeServices,
  formatNTD,
  getQuote,
  makeOrderNo,
  packages,
  regionsMeta,
  vehicles,
  type ConciergeId,
  type Region,
  type TourPackage,
  type VehicleId
} from "@/lib/catalog";
import {
  attractions,
  counties,
  estimateTrip,
  playStyles,
  zonesMeta,
  type ZoneId
} from "@/lib/attractions";
import { itineraries } from "@/lib/itineraries";
import { trackEvent } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

const WEB3FORMS_KEY = "73cec211-5017-4fc4-a381-0e26462302da";

// 綠界收款連結：依「行程總價」分流
const ECPAY_LINK_LOW = "https://p.ecpay.com.tw/CF6810E"; // 總價 NT$10,000 以內
const ECPAY_LINK_HIGH = "https://p.ecpay.com.tw/901A4AD"; // 總價超過 NT$10,000
const ECPAY_LINK_THRESHOLD = 10000;

function fmt(template: string, ...values: Array<string | number>): string {
  let result = template;
  for (const value of values) {
    result = result.replace("%s", String(value));
  }
  return result;
}

type RouteVisual = {
  image: string;
};

const routeVisuals: Record<string, RouteVisual> = {
  "yehliu-jiufen-shifen": {
    image: "/route-images/yehliu-jiufen-shifen.png"
  },
  "taipei-city-classic": {
    image: "/route-images/taipei-city-classic.png"
  },
  "yangmingshan-beitou": {
    image: "/route-images/yangmingshan-beitou.png"
  },
  "north-coast": {
    image: "/route-images/north-coast.png"
  },
  "yilan-day": {
    image: "/route-images/yilan-day.png"
  },
  "sun-moon-lake": {
    image: "/route-images/sun-moon-lake.png"
  },
  "cingjing-hehuan-2d": {
    image: "/route-images/cingjing-hehuan-2d.png"
  },
  "alishan-2d": {
    image: "/route-images/alishan-2d.png"
  },
  "tainan-heritage": {
    image: "/route-images/tainan-heritage.png"
  },
  "kenting-3d": {
    image: "/route-images/kenting-3d.png"
  },
  "taroko-hualien": {
    image: "/route-images/taroko-hualien.png"
  },
  "east-valley-3d": {
    image: "/route-images/east-valley-3d.png"
  },
  "round-island-5d": {
    image: "/route-images/round-island-5d.png"
  }
};

function RouteScenicImage({
  item,
  lang,
  daysUnit,
  popularTag
}: {
  item: TourPackage;
  lang: "zh" | "en";
  daysUnit: string;
  popularTag: string;
}) {
  const visual = routeVisuals[item.id];

  return (
    <div className="relative h-44 overflow-hidden bg-freego-teal text-white">
      <img
        src={visual?.image}
        alt={lang === "zh" ? item.titleZh : item.titleEn}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-freego-ink/58 via-freego-ink/12 to-freego-ink/8" />
      <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-freego-teal">
        {lang === "zh" ? regionsMeta[item.region].zh : regionsMeta[item.region].en}
        ・{item.days}
        {daysUnit}
      </span>
      {item.popular ? (
        <span className="absolute right-4 top-4 rounded-full bg-freego-orange px-3 py-1 text-xs font-black text-freego-ink">
          {popularTag}
        </span>
      ) : null}
    </div>
  );
}

const customBase: TourPackage = {
  id: "custom",
  region: "island",
  days: 1,
  hoursPerDay: 8,
  emoji: "👑",
  titleZh: "客製化尊榮行程",
  titleEn: "Tailor-Made Premium Journey",
  highlightsZh: [],
  highlightsEn: [],
  descZh: "",
  descEn: ""
};

export function BookingSection() {
  const { lang, t } = useLang();
  const b = t.booking;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [region, setRegion] = useState<Region | "all">("all");
  const [pkg, setPkg] = useState<TourPackage | null>(null);
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);
  const [pickup, setPickup] = useState("");
  const [vehicleId, setVehicleId] = useState<VehicleId | "">("");
  const [itineraryId, setItineraryId] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [customPurpose, setCustomPurpose] = useState("");
  const [customFood, setCustomFood] = useState("");
  const [customAccommodation, setCustomAccommodation] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [extraDays, setExtraDays] = useState(0);
  const [extraHours, setExtraHours] = useState(0);
  const [childSeats, setChildSeats] = useState(0);
  const [services, setServices] = useState<ConciergeId[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [paidOrder, setPaidOrder] = useState("");
  const [orderInfo, setOrderInfo] = useState<{
    orderNo: string;
    payUrl: string;
    deposit: number;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "1" && params.get("order")) {
      setPaidOrder(params.get("order") || "");
      window.history.replaceState({}, "", `${window.location.pathname}#book`);
    }

    // 從綠界頁面按「上一頁」回來時（bfcache），重置付款按鈕狀態
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setPaying(false);
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const visiblePackages = useMemo(
    () =>
      region === "all" ? packages : packages.filter((p) => p.region === region),
    [region]
  );

  const quote = useMemo(
    () =>
      pkg && vehicleId
        ? getQuote(pkg, vehicleId, {
            extraDays,
            extraHoursPerDay: extraHours,
            childSeats
          })
        : null,
    [pkg, vehicleId, extraDays, extraHours, childSeats]
  );

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId) || null;

  const tripEstimate = useMemo(
    () => (isCustom ? estimateTrip(selectedSpots) : null),
    [isCustom, selectedSpots]
  );

  // AI 建議天數自動帶入（客製模式）
  useEffect(() => {
    if (isCustom && tripEstimate) {
      setPkg((current) =>
        current ? { ...current, days: tripEstimate.days } : current
      );
    }
  }, [isCustom, tripEstimate]);

  function toggleSpot(id: string) {
    setSelectedSpots((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
    setErrors((current) => {
      const next = { ...current };
      delete next.customDest;
      return next;
    });
  }

  function toggleStyle(id: string) {
    setSelectedStyles((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
  }

  function toggleService(id: ConciergeId) {
    setServices((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
  }

  const today = new Date().toISOString().split("T")[0];

  function choosePackage(next: TourPackage) {
    setPkg(next);
    setIsCustom(false);
    setVehicleId("");
    setItineraryId(itineraries[next.id]?.[0]?.id || "");
    setErrors({});
    setStep(2);
    trackEvent("select_item", {
      item_id: next.id,
      item_name: lang === "zh" ? next.titleZh : next.titleEn,
      item_category: "tour_package"
    });
    document
      .getElementById("book")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startCustom() {
    setPkg({ ...customBase });
    setIsCustom(true);
    setVehicleId("");
    setItineraryId("");
    setSelectedSpots([]);
    setSelectedStyles([]);
    setErrors({});
    setStep(2);
    trackEvent("select_item", {
      item_id: "custom",
      item_name: lang === "zh" ? customBase.titleZh : customBase.titleEn,
      item_category: "custom_tour"
    });
    document
      .getElementById("book")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep2() {
    const next: Record<string, string> = {};
    if (isCustom && selectedSpots.length === 0)
      next.customDest = b.errors.customDest;
    if (!date) next.date = b.errors.date;
    if (!pickup.trim()) next.pickup = b.errors.pickup;
    if (!vehicleId) next.vehicle = b.errors.vehicle;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep3() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = b.errors.name;
    if (!contact.trim()) next.contact = b.errors.contact;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handlePay() {
    if (!pkg || !vehicleId || !quote) return;
    if (!validateStep3()) return;

    setPaying(true);
    setPayError("");

    const orderNo = makeOrderNo();
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const pkgTitle = lang === "zh" ? pkg.titleZh : pkg.titleEn;
    const vehicleName = vehicle
      ? lang === "zh"
        ? vehicle.nameZh
        : vehicle.nameEn
      : vehicleId;

    const serviceNames = services
      .map(
        (id) => conciergeServices.find((service) => service.id === id)?.zh || id
      )
      .join("、");

    const chosenItinerary = itineraries[pkg.id]?.find(
      (option) => option.id === itineraryId
    );

    // 訂單通知信（不阻擋付款流程）
    const orderMessage = [
      `訂單編號：${orderNo}`,
      `行程：${pkg.titleZh}`,
      isCustom
        ? `【客製景點】${
            selectedSpots
              .map((id) => attractions.find((a) => a.id === id)?.zh || id)
              .join("、") || "未選"
          }`
        : "",
      isCustom && selectedStyles.length
        ? `【想怎麼玩】${selectedStyles
            .map((id) => playStyles.find((s) => s.id === id)?.zh || id)
            .join("、")}`
        : "",
      isCustom && tripEstimate
        ? `【AI 評估】遊玩約 ${tripEstimate.stayHours} 小時＋車程約 ${tripEstimate.travelHours} 小時，建議 ${tripEstimate.days} 天 ${tripEstimate.nights} 夜`
        : "",
      isCustom && customPurpose ? `旅遊目的：${customPurpose}` : "",
      isCustom && customFood ? `美食偏好：${customFood}` : "",
      isCustom && customAccommodation
        ? `住宿偏好：${customAccommodation}`
        : "",
      isCustom ? "" : `行程版本：${chosenItinerary?.nameZh || "未選"}`,
      chosenItinerary
        ? `行程內容：\n  ${chosenItinerary.stopsZh.join("\n  ")}`
        : "",
      `出發日期：${date}`,
      `總天數：${quote.days} 天${extraDays ? `（含延長 ${extraDays} 天）` : ""}`,
      `乘客人數：${pax} 位`,
      `上車地點：${pickup}`,
      `車型：${vehicle?.nameZh || vehicleId}`,
      `每日延長時數：${extraHours ? `${extraHours} 小時` : "無"}`,
      `兒童安全座椅：${childSeats ? `${childSeats} 張` : "無"}`,
      `代訂服務需求：${serviceNames || "無"}`,
      `行程總價：${formatNTD(quote.total)}`,
      `線上訂金（30%）：${formatNTD(quote.deposit)}`,
      `尾款：${formatNTD(quote.balance)}`,
      `聯絡姓名：${name}`,
      `聯絡方式：${contact}`,
      `特殊需求：${notes || "無"}`,
      `付款連結：${
        quote.total <= ECPAY_LINK_THRESHOLD ? ECPAY_LINK_LOW : ECPAY_LINK_HIGH
      }（客人自行輸入訂金金額）`
    ]
      .filter(Boolean)
      .join("\n");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `🚐 FreeGO 新訂單 ${orderNo}：${pkg.titleZh}（${date}）`,
        from_name: "FreeGO 線上訂車",
        botcheck: false,
        message: orderMessage
      })
    }).catch(() => undefined);

    // 依總價分流至對應的綠界收款連結
    const payUrl =
      quote.total <= ECPAY_LINK_THRESHOLD ? ECPAY_LINK_LOW : ECPAY_LINK_HIGH;

    console.log("[FreeGO order]", orderNo, pkgTitle, vehicleName, payUrl);

    trackEvent("generate_lead", {
      currency: "TWD",
      value: quote.total,
      lead_source: "booking_flow",
      package_id: pkg.id,
      vehicle_id: vehicleId
    });
    setOrderInfo({ orderNo, payUrl, deposit: quote.deposit });
    setPaying(false);
    document
      .getElementById("book")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const inputClass =
    "min-h-12 w-full rounded-freego border border-freego-gray bg-white px-4 text-base outline-none transition focus:border-freego-teal focus:ring-4 focus:ring-freego-teal/10";

  return (
    <section id="book" className="section-spacing bg-freego-ivory">
      <div className="container-freego">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow mb-3">{b.eyebrow}</p>
          <h2 className="text-3xl font-black leading-[1.18] text-freego-teal md:whitespace-nowrap md:text-[clamp(2rem,3.45vw,2.6rem)]">
            {b.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-freego-ink/72 md:text-[1.08rem]">
            {b.description}
          </p>
        </div>

        {paidOrder ? (
          <div className="mx-auto mt-10 max-w-2xl rounded-freego border border-freego-teal/25 bg-white p-8 text-center shadow-soft">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-freego-teal text-white">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <p className="mt-5 text-2xl font-black text-freego-teal">
              {b.paidTitle}
            </p>
            <p className="mt-3 leading-[1.8] text-freego-ink/72">{b.paidCopy}</p>
            <p className="mt-4 inline-block rounded-freego bg-freego-ivory px-4 py-2 font-mono text-sm font-bold text-freego-teal">
              {b.paidOrderLabel}: {paidOrder}
            </p>
          </div>
        ) : null}

        {/* 步驟指示 */}
        <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2">
          {b.steps.map((label, index) => {
            const stepNo = (index + 1) as 1 | 2 | 3;
            const active = step === stepNo;
            const done = step > stepNo;
            return (
              <div key={label} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (done) setStep(stepNo);
                  }}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                    active
                      ? "bg-freego-teal text-white"
                      : done
                        ? "cursor-pointer bg-freego-teal/15 text-freego-teal"
                        : "bg-white text-freego-ink/45"
                  }`}
                >
                  <span>{stepNo}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {index < b.steps.length - 1 ? (
                  <span className="h-px w-6 bg-freego-gray" />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Step 1: 選行程 */}
        {step === 1 ? (
          <div className="mt-10">
            {/* 客製化尊榮行程入口 */}
            <div className="mb-8 overflow-hidden rounded-freego border border-freego-orange/40 bg-gradient-to-br from-freego-ink via-freego-teal to-[#1a6b6b] p-6 text-white shadow-soft md:p-8">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <span className="rounded-full bg-freego-orange px-3 py-1 text-xs font-black text-freego-ink">
                    👑 {b.customCardTag}
                  </span>
                  <h3 className="mt-3 text-2xl font-black">
                    {b.customCardTitle}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/78">
                    {b.customCardDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startCustom}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-freego bg-freego-orange px-6 font-black text-freego-ink shadow-[0_12px_28px_rgba(242,140,56,0.3)] transition hover:-translate-y-0.5 hover:bg-[#e77b24]"
                >
                  {b.customCardBtn} ✨
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {(["all", "north", "central", "south", "east", "island"] as const).map(
                (value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRegion(value)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                      region === value
                        ? "border-freego-teal bg-freego-teal text-white"
                        : "border-freego-gray bg-white text-freego-ink/65 hover:border-freego-orange hover:text-freego-orange"
                    }`}
                  >
                    {value === "all"
                      ? b.regionAll
                      : lang === "zh"
                        ? regionsMeta[value].zh
                        : regionsMeta[value].en}
                  </button>
                )
              )}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visiblePackages.map((item) => {
                const fromPrice =
                  Math.min(...vehicles.map((v) => v.dayRate)) * item.days +
                  (item.days > 1 ? (item.days - 1) * 1000 : 0);
                return (
                  <article
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-freego border border-freego-gray bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <RouteScenicImage
                      item={item}
                      lang={lang}
                      daysUnit={b.daysUnit}
                      popularTag={b.popularTag}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-black leading-tight text-freego-teal">
                        {lang === "zh" ? item.titleZh : item.titleEn}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-freego-ink/65">
                        {lang === "zh" ? item.descZh : item.descEn}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(lang === "zh"
                          ? item.highlightsZh
                          : item.highlightsEn
                        ).map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full bg-freego-ivory px-3 py-1 text-xs font-bold text-freego-ink/70"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                        <div>
                          <p className="text-xs text-freego-ink/55">
                            {b.fromPrefix}
                          </p>
                          <p className="text-xl font-black text-freego-orange">
                            {formatNTD(fromPrice)}
                            <span className="ml-1 text-xs font-bold text-freego-ink/55">
                              {b.fromSuffix}
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => choosePackage(item)}
                          className="rounded-freego bg-freego-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-freego-teal/90"
                        >
                          {b.selectBtn}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 text-center text-freego-ink/65">
              {b.customLead}{" "}
              <a href="#plan" className="font-bold text-freego-orange underline">
                {b.customLink}
              </a>
            </p>
          </div>
        ) : null}

        {/* Step 2: 日期與車型 */}
        {step === 2 && pkg ? (
          <div className="mx-auto mt-10 max-w-4xl rounded-freego border border-freego-gray bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-freego-orange">
                  {isCustom
                    ? b.customCardTag
                    : lang === "zh"
                      ? regionsMeta[pkg.region].zh
                      : regionsMeta[pkg.region].en}
                  ・{pkg.days}
                  {b.daysUnit}・{b.hoursNote}
                </p>
                <h3 className="mt-1 text-2xl font-black text-freego-teal">
                  {pkg.emoji} {lang === "zh" ? pkg.titleZh : pkg.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="shrink-0 text-sm font-bold text-freego-ink/55 hover:text-freego-orange"
              >
                {b.backBtn}
              </button>
            </div>

            {/* 客製化需求 */}
            {isCustom ? (
              <div className="mt-6 rounded-freego border border-freego-orange/40 bg-freego-ivory p-5 md:p-6">
                {/* 想去哪裡玩：分區複選 */}
                <p className="text-sm font-black text-freego-teal">
                  📍 {b.customPlacesLabel}
                </p>
                {errors.customDest ? (
                  <p className="mt-1 text-sm font-bold text-freego-orange">
                    {errors.customDest}
                  </p>
                ) : null}
                <details className="group mt-2 rounded-freego border border-freego-gray bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold text-freego-ink/75 [&::-webkit-details-marker]:hidden">
                    <span>
                      {selectedSpots.length === 0
                        ? b.customPlacesEmpty
                        : fmt(b.customPlacesCount, selectedSpots.length)}
                    </span>
                    <span className="text-freego-orange transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="max-h-80 overflow-y-auto border-t border-freego-gray px-4 pb-4">
                    {(["north", "central", "south", "east"] as ZoneId[]).map(
                      (zone) => (
                        <div key={zone}>
                          <p className="sticky top-0 mt-3 bg-white py-1 text-xs font-black tracking-widest text-freego-orange">
                            ── {lang === "zh" ? zonesMeta[zone].zh : zonesMeta[zone].en}{" "}
                            ──
                          </p>
                          {counties
                            .filter((county) => county.zone === zone)
                            .map((county) => {
                              const spots = attractions.filter(
                                (a) => a.county === county.id
                              );
                              if (spots.length === 0) return null;
                              return (
                                <div key={county.id} className="mt-2">
                                  <p className="text-xs font-bold text-freego-ink/50">
                                    {lang === "zh" ? county.zh : county.en}
                                  </p>
                                  <div className="mt-1.5 flex flex-wrap gap-2">
                                    {spots.map((spot) => {
                                      const checked = selectedSpots.includes(
                                        spot.id
                                      );
                                      return (
                                        <button
                                          key={spot.id}
                                          type="button"
                                          onClick={() => toggleSpot(spot.id)}
                                          className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                                            checked
                                              ? "border-freego-teal bg-freego-teal text-white"
                                              : "border-freego-gray bg-white text-freego-ink/70 hover:border-freego-orange hover:text-freego-orange"
                                          }`}
                                        >
                                          {spot.hot ? "🔥 " : ""}
                                          {lang === "zh" ? spot.zh : spot.en}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )
                    )}
                  </div>
                </details>

                {/* 想怎麼玩：玩法複選 */}
                <p className="mt-4 text-sm font-black text-freego-teal">
                  🎡 {b.customStylesLabel}
                </p>
                <details className="group mt-2 rounded-freego border border-freego-gray bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold text-freego-ink/75 [&::-webkit-details-marker]:hidden">
                    <span>
                      {selectedStyles.length === 0
                        ? b.customStylesEmpty
                        : fmt(b.customStylesCount, selectedStyles.length)}
                    </span>
                    <span className="text-freego-orange transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="flex flex-wrap gap-2 border-t border-freego-gray px-4 py-4">
                    {playStyles.map((style) => {
                      const checked = selectedStyles.includes(style.id);
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => toggleStyle(style.id)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                            checked
                              ? "border-freego-teal bg-freego-teal text-white"
                              : "border-freego-gray bg-white text-freego-ink/70 hover:border-freego-orange hover:text-freego-orange"
                          }`}
                        >
                          {lang === "zh" ? style.zh : style.en}
                        </button>
                      );
                    })}
                  </div>
                </details>

                {/* AI 行程評估 */}
                {tripEstimate ? (
                  <div className="mt-4 rounded-freego bg-freego-teal p-4 text-white">
                    <p className="text-sm font-black">🤖 {b.aiTitle}</p>
                    <p className="mt-1.5 text-sm leading-6 text-white/85">
                      {fmt(
                        b.aiResult,
                        tripEstimate.stayHours,
                        tripEstimate.travelHours,
                        tripEstimate.days,
                        tripEstimate.nights
                      )}
                    </p>
                    <p className="mt-1 text-xs text-white/60">{b.aiApplied}</p>
                    {pkg.days < tripEstimate.days ? (
                      <p className="mt-2 rounded-freego bg-freego-orange/20 p-2 text-xs font-bold text-freego-orange">
                        {b.aiTooShort}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-freego-teal">
                      📅 {b.customDaysLabel}
                    </span>
                    <select
                      value={pkg.days}
                      onChange={(event) => {
                        const nextDays = Number(event.target.value);
                        setPkg((current) =>
                          current ? { ...current, days: nextDays } : current
                        );
                      }}
                      className={inputClass}
                    >
                      {Array.from({ length: 8 }, (_, index) => index + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            {n} {b.daysUnit}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-freego-teal">
                      🎯 {t.plan.fields.purpose}
                    </span>
                    <select
                      value={customPurpose}
                      onChange={(event) =>
                        setCustomPurpose(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">
                        {t.plan.fields.purposePlaceholder}
                      </option>
                      {t.plan.fields.purposeOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="mt-4 text-xs font-bold text-freego-ink/50">
                  {b.customPrefsTitle}
                </p>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-freego-teal">
                      🍜 {t.plan.fields.food}
                    </span>
                    <input
                      type="text"
                      value={customFood}
                      onChange={(event) => setCustomFood(event.target.value)}
                      placeholder={t.plan.fields.foodPlaceholder}
                      className={inputClass}
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-freego-teal">
                      🏨 {t.plan.fields.accommodation}
                    </span>
                    <select
                      value={customAccommodation}
                      onChange={(event) =>
                        setCustomAccommodation(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">
                        {t.plan.fields.accommodationPlaceholder}
                      </option>
                      {t.plan.fields.accommodationOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ) : null}

            {/* 建議行程二選一 */}
            {itineraries[pkg.id] ? (
              <div className="mt-6 rounded-freego border border-freego-teal/20 bg-freego-ivory p-5 md:p-6">
                <p className="text-sm font-black text-freego-teal">
                  🗺️ {b.itinTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-freego-ink/55">
                  {b.itinSubtitle}
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {itineraries[pkg.id].map((option) => {
                    const selected = itineraryId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setItineraryId(option.id)}
                        className={`relative rounded-freego border p-5 text-left transition ${
                          selected
                            ? "border-freego-teal bg-white ring-2 ring-freego-teal/20"
                            : "border-freego-gray bg-white/70 hover:border-freego-orange hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-black text-freego-teal">
                            {lang === "zh" ? option.nameZh : option.nameEn}
                          </p>
                          {selected ? (
                            <BadgeCheck className="h-5 w-5 shrink-0 text-freego-teal" />
                          ) : null}
                        </div>
                        <ul className="mt-3 grid gap-1.5">
                          {(lang === "zh"
                            ? option.stopsZh
                            : option.stopsEn
                          ).map((stop) => (
                            <li
                              key={stop}
                              className="flex gap-2 text-xs leading-5 text-freego-ink/70"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-freego-orange" />
                              {stop}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2">
                <span className="flex items-center gap-1.5 text-sm font-bold text-freego-teal">
                  <CalendarDays className="h-4 w-4" /> {b.dateLabel}
                </span>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={inputClass}
                />
                {errors.date ? (
                  <span className="text-sm font-bold text-freego-orange">
                    {errors.date}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2">
                <span className="flex items-center gap-1.5 text-sm font-bold text-freego-teal">
                  <Users className="h-4 w-4" /> {b.paxLabel}
                </span>
                <select
                  value={pax}
                  onChange={(event) => setPax(Number(event.target.value))}
                  className={inputClass}
                >
                  {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (n) => (
                      <option key={n} value={n}>
                        {n} {b.paxUnit}
                      </option>
                    )
                  )}
                </select>
              </label>
              <label className="grid gap-2">
                <span className="flex items-center gap-1.5 text-sm font-bold text-freego-teal">
                  <MapPin className="h-4 w-4" /> {b.pickupLabel}
                </span>
                <input
                  type="text"
                  value={pickup}
                  onChange={(event) => setPickup(event.target.value)}
                  placeholder={b.pickupPlaceholder}
                  className={inputClass}
                />
                {errors.pickup ? (
                  <span className="text-sm font-bold text-freego-orange">
                    {errors.pickup}
                  </span>
                ) : null}
              </label>
            </div>

            <p className="mt-8 flex items-center gap-1.5 text-sm font-bold text-freego-teal">
              🚘 {b.vehicleLabel}
            </p>
            {errors.vehicle ? (
              <p className="mt-1 text-sm font-bold text-freego-orange">
                {errors.vehicle}
              </p>
            ) : null}
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => {
                const disabled = pax > vehicle.maxPax;
                const selected = vehicleId === vehicle.id;
                const vehicleQuote = getQuote(pkg, vehicle.id);
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setVehicleId(vehicle.id);
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.vehicle;
                        return next;
                      });
                    }}
                    className={`relative rounded-freego border p-5 text-left transition ${
                      selected
                        ? "border-freego-teal bg-freego-teal/5 ring-2 ring-freego-teal/20"
                        : disabled
                          ? "cursor-not-allowed border-freego-gray bg-freego-ivory opacity-50"
                          : "border-freego-gray bg-white hover:border-freego-orange hover:shadow-lift"
                    }`}
                  >
                    {vehicle.tagZh ? (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-freego-orange px-3 py-0.5 text-xs font-black text-freego-ink">
                        ⭐ {lang === "zh" ? vehicle.tagZh : vehicle.tagEn}
                      </span>
                    ) : null}
                    <p className="text-3xl">{vehicle.emoji}</p>
                    <p className="mt-2 font-black text-freego-teal">
                      {lang === "zh" ? vehicle.nameZh : vehicle.nameEn}
                    </p>
                    <p className="mt-1 text-lg font-black text-freego-orange">
                      {formatNTD(vehicleQuote.total)}
                      <span className="ml-1 text-xs font-bold text-freego-ink/50">
                        / {pkg.days}
                        {b.daysUnit}
                      </span>
                    </p>
                    <div className="mt-3 grid gap-1 text-xs text-freego-ink/65">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {disabled
                          ? b.tooSmall
                          : fmt(b.maxPaxFmt, vehicle.maxPax)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Luggage className="h-3.5 w-3.5" />
                        {fmt(b.luggageFmt, vehicle.luggage)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {fmt(b.overtimeFmt, vehicle.overtime)}
                      </span>
                    </div>
                    {selected ? (
                      <BadgeCheck className="absolute bottom-4 right-4 h-6 w-6 text-freego-teal" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* 加購與客製 */}
            <div className="mt-8 rounded-freego border border-freego-orange/30 bg-freego-ivory p-5 md:p-6">
              <p className="text-sm font-black text-freego-teal">
                ➕ {b.addonsTitle}
                <span className="ml-2 text-xs font-bold text-freego-ink/50">
                  {b.addonsSubtitle}
                </span>
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    📅 {b.extraDaysLabel}
                  </span>
                  <select
                    value={extraDays}
                    onChange={(event) =>
                      setExtraDays(Number(event.target.value))
                    }
                    className={inputClass}
                  >
                    <option value={0}>{b.extraDaysNone}</option>
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {fmt(
                          b.extraDaysFmt,
                          n,
                          selectedVehicle
                            ? formatNTD(selectedVehicle.dayRate)
                            : "—"
                        )}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    ⏰ {b.extraHoursLabel}
                  </span>
                  <select
                    value={extraHours}
                    onChange={(event) =>
                      setExtraHours(Number(event.target.value))
                    }
                    className={inputClass}
                  >
                    <option value={0}>{b.extraHoursNone}</option>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {fmt(
                          b.extraHoursFmt,
                          n,
                          selectedVehicle
                            ? formatNTD(selectedVehicle.overtime)
                            : "—"
                        )}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    👶 {b.childSeatLabel}
                  </span>
                  <select
                    value={childSeats}
                    onChange={(event) =>
                      setChildSeats(Number(event.target.value))
                    }
                    className={inputClass}
                  >
                    <option value={0}>{b.childSeatNone}</option>
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {fmt(b.childSeatFmt, n)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="mt-5 text-sm font-bold text-freego-teal">
                🛎️ {b.conciergeLabel}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {conciergeServices.map((service) => {
                  const checked = services.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-freego border px-3 text-center text-sm font-bold transition ${
                        checked
                          ? "border-freego-teal bg-white text-freego-teal ring-2 ring-freego-teal/15"
                          : "border-freego-gray bg-white/65 text-freego-ink/75 hover:border-freego-orange/55 hover:bg-freego-orange/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleService(service.id)}
                        className="h-4 w-4 accent-freego-teal"
                      />
                      <span>{lang === "zh" ? service.zh : service.en}</span>
                    </label>
                  );
                })}
              </div>
              {quote ? (
                <div className="mt-5 flex items-center justify-between rounded-freego bg-freego-teal px-4 py-3 text-white">
                  <span className="text-sm font-bold">{b.totalLabel}</span>
                  <span className="text-lg font-black">
                    {formatNTD(quote.total)}
                  </span>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => {
                if (validateStep2()) {
                  trackEvent("begin_checkout", {
                    currency: "TWD",
                    value: quote?.total,
                    package_id: pkg?.id,
                    vehicle_id: vehicleId
                  });
                  setStep(3);
                }
              }}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-freego bg-freego-orange px-6 font-bold text-freego-ink shadow-[0_12px_28px_rgba(242,140,56,0.24)] transition hover:-translate-y-0.5 hover:bg-[#e77b24] sm:w-auto"
            >
              {b.nextBtn2}
            </button>
          </div>
        ) : null}

        {/* 訂單成立：前往綠界付款 */}
        {orderInfo ? (
          <div className="mx-auto mt-10 max-w-2xl rounded-freego border border-freego-teal/25 bg-white p-8 text-center shadow-soft">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-freego-teal text-white">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <p className="mt-5 text-2xl font-black text-freego-teal">
              {b.orderCreatedTitle}
            </p>
            <p className="mt-3 leading-[1.8] text-freego-ink/72">
              {b.orderCreatedCopy}
            </p>
            <p className="mt-5 inline-block rounded-freego bg-freego-ivory px-4 py-2 font-mono text-sm font-bold text-freego-teal">
              {b.paidOrderLabel}: {orderInfo.orderNo}
            </p>
            <div className="mt-4 rounded-freego bg-freego-orange/10 p-5">
              <p className="text-sm font-bold text-freego-ink/70">
                {b.payAmountLabel}
              </p>
              <p className="mt-1 text-4xl font-black text-freego-orange">
                {formatNTD(orderInfo.deposit)}
              </p>
            </div>
            <p className="mt-4 rounded-freego bg-freego-ivory p-4 text-left text-sm leading-6 text-freego-ink/72">
              💡 {b.payInstructions}
            </p>
            <a
              href={orderInfo.payUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("add_payment_info", {
                  currency: "TWD",
                  value: orderInfo.deposit,
                  payment_type: "ecpay_payment_link"
                })
              }
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-freego bg-freego-orange px-6 text-lg font-black text-freego-ink shadow-[0_12px_28px_rgba(242,140,56,0.3)] transition hover:-translate-y-0.5 hover:bg-[#e77b24]"
            >
              <ShieldCheck className="h-6 w-6" />
              {b.goPayBtn}
            </a>
            <p className="mt-4 text-sm leading-6 text-freego-ink/60">
              {b.afterPayNote}
            </p>
          </div>
        ) : null}

        {/* Step 3: 確認付款 */}
        {!orderInfo && step === 3 && pkg && vehicleId && quote ? (
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-freego border border-freego-gray bg-white p-6 shadow-soft md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-black text-freego-teal">
                  {pkg.emoji} {lang === "zh" ? pkg.titleZh : pkg.titleEn}
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shrink-0 text-sm font-bold text-freego-ink/55 hover:text-freego-orange"
                >
                  {b.backBtn}
                </button>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-freego-ink/75">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-freego-orange" />
                  {date}・{quote.days}
                  {b.daysUnit}
                  {extraHours ? `・+${extraHours}h/day` : ""}
                </p>
                {isCustom && selectedSpots.length > 0 ? (
                  <p className="flex gap-2">
                    👑
                    <span>
                      {b.customSummaryLabel}：
                      {selectedSpots
                        .map((id) => {
                          const spot = attractions.find((a) => a.id === id);
                          return spot
                            ? lang === "zh"
                              ? spot.zh
                              : spot.en
                            : id;
                        })
                        .join("、")}
                    </span>
                  </p>
                ) : null}
                {!isCustom && itineraries[pkg.id] ? (
                  <p className="flex items-center gap-2">
                    🗺️ {b.itinLabel}：
                    {(() => {
                      const option = itineraries[pkg.id].find(
                        (item) => item.id === itineraryId
                      );
                      return option
                        ? lang === "zh"
                          ? option.nameZh
                          : option.nameEn
                        : "—";
                    })()}
                  </p>
                ) : null}
                {services.length > 0 ? (
                  <p className="flex items-center gap-2">
                    🛎️
                    {services
                      .map((id) => {
                        const service = conciergeServices.find(
                          (item) => item.id === id
                        );
                        return lang === "zh" ? service?.zh : service?.en;
                      })
                      .join("・")}
                  </p>
                ) : null}
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-freego-orange" />
                  {pax} {b.paxUnit}・
                  {lang === "zh"
                    ? vehicles.find((v) => v.id === vehicleId)?.nameZh
                    : vehicles.find((v) => v.id === vehicleId)?.nameEn}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-freego-orange" />
                  {pickup}
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {b.nameLabel}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={b.namePlaceholder}
                    className={inputClass}
                  />
                  {errors.name ? (
                    <span className="text-sm font-bold text-freego-orange">
                      {errors.name}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {b.contactLabel}
                  </span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder={b.contactPlaceholder}
                    className={inputClass}
                  />
                  {errors.contact ? (
                    <span className="text-sm font-bold text-freego-orange">
                      {errors.contact}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {b.notesLabel}
                  </span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder={b.notesPlaceholder}
                    rows={3}
                    className="w-full rounded-freego border border-freego-gray bg-white px-4 py-3 text-base outline-none transition focus:border-freego-teal focus:ring-4 focus:ring-freego-teal/10"
                  />
                </label>
              </div>
            </div>

            <div className="h-fit rounded-freego bg-freego-teal p-6 text-white shadow-soft md:p-8">
              <p className="text-lg font-black">{b.quoteTitle}</p>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/75">
                    {b.lineCar}（
                    {fmt(b.lineCarFmt, formatNTD(quote.dayRate), quote.days)}）
                  </span>
                  <span className="font-bold">
                    {formatNTD(quote.carSubtotal)}
                  </span>
                </div>
                {quote.lodging > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-white/75">
                      {b.lineLodging}（{fmt(b.lodgingFmt, quote.days - 1)}）
                    </span>
                    <span className="font-bold">
                      {formatNTD(quote.lodging)}
                    </span>
                  </div>
                ) : null}
                {quote.overtime > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-white/75">
                      {b.lineOvertime}（+{extraHours}h × {quote.days}
                      {b.daysUnit}）
                    </span>
                    <span className="font-bold">
                      {formatNTD(quote.overtime)}
                    </span>
                  </div>
                ) : null}
                {quote.childSeat > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-white/75">
                      {b.lineChildSeat}（{childSeats} × {quote.days}
                      {b.daysUnit}）
                    </span>
                    <span className="font-bold">
                      {formatNTD(quote.childSeat)}
                    </span>
                  </div>
                ) : null}
                <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-3 text-base">
                  <span className="font-black">{b.totalLabel}</span>
                  <span className="font-black">{formatNTD(quote.total)}</span>
                </div>
                <div className="flex items-center justify-between rounded-freego bg-freego-orange px-4 py-3 text-freego-ink">
                  <span className="font-black">{b.depositLabel}</span>
                  <span className="text-lg font-black">
                    {formatNTD(quote.deposit)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/75">
                  <span>{b.balanceLabel}</span>
                  <span className="font-bold">{formatNTD(quote.balance)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={paying}
                onClick={handlePay}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-freego bg-white px-6 font-black text-freego-teal transition hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70"
              >
                <ShieldCheck className="h-5 w-5" />
                {paying
                  ? b.payingBtn
                  : `${b.payBtn} ${formatNTD(quote.deposit)}`}
              </button>
              {payError ? (
                <p className="mt-3 rounded-freego bg-white/10 p-3 text-sm font-bold leading-6 text-freego-orange">
                  {payError}
                </p>
              ) : null}
              {services.length > 0 ? (
                <p className="mt-3 rounded-freego bg-white/10 p-2.5 text-xs leading-5 text-white/75">
                  {b.conciergeNote}
                </p>
              ) : null}
              <p className="mt-4 text-xs leading-5 text-white/60">{b.terms}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
