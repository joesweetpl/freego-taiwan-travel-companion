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
  formatNTD,
  getQuote,
  makeOrderNo,
  packages,
  regionsMeta,
  vehicles,
  type Region,
  type TourPackage,
  type VehicleId
} from "@/lib/catalog";
import { useLang } from "@/lib/i18n";

const WEB3FORMS_KEY = "73cec211-5017-4fc4-a381-0e26462302da";

function fmt(template: string, ...values: Array<string | number>): string {
  let result = template;
  for (const value of values) {
    result = result.replace("%s", String(value));
  }
  return result;
}

const regionGradients: Record<Region, string> = {
  north: "from-freego-teal to-[#1a6b6b]",
  central: "from-[#3d6b35] to-[#5a8a4a]",
  south: "from-[#b3541e] to-freego-orange",
  east: "from-[#1e5a8a] to-[#3a7ab5]",
  island: "from-freego-ink to-freego-teal"
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
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [paidOrder, setPaidOrder] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "1" && params.get("order")) {
      setPaidOrder(params.get("order") || "");
      window.history.replaceState({}, "", `${window.location.pathname}#book`);
    }
  }, []);

  const visiblePackages = useMemo(
    () =>
      region === "all" ? packages : packages.filter((p) => p.region === region),
    [region]
  );

  const quote = useMemo(
    () => (pkg && vehicleId ? getQuote(pkg, vehicleId) : null),
    [pkg, vehicleId]
  );

  const today = new Date().toISOString().split("T")[0];

  function choosePackage(next: TourPackage) {
    setPkg(next);
    setVehicleId("");
    setErrors({});
    setStep(2);
    document
      .getElementById("book")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep2() {
    const next: Record<string, string> = {};
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

    // 訂單通知信（不阻擋付款流程）
    const orderMessage = [
      `訂單編號：${orderNo}`,
      `行程：${pkg.titleZh}`,
      `出發日期：${date}`,
      `乘客人數：${pax} 位`,
      `上車地點：${pickup}`,
      `車型：${vehicle?.nameZh || vehicleId}`,
      `行程總價：${formatNTD(quote.total)}`,
      `線上訂金（30%）：${formatNTD(quote.deposit)}`,
      `尾款：${formatNTD(quote.balance)}`,
      `聯絡姓名：${name}`,
      `聯絡方式：${contact}`,
      `特殊需求：${notes || "無"}`,
      `付款方式：綠界 ECPay（訂單成立時導向付款）`
    ].join("\n");

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

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNo,
          amount: quote.deposit,
          itemName: `${pkgTitle} - ${vehicleName} x1`
        })
      });
      const result = (await response.json()) as {
        success: boolean;
        action?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok || !result.success || !result.action || !result.fields) {
        throw new Error("Checkout failed");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = result.action;
      for (const [key, value] of Object.entries(result.fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch {
      setPayError(b.payError);
      setPaying(false);
    }
  }

  const inputClass =
    "min-h-12 w-full rounded-freego border border-freego-gray bg-white px-4 text-base outline-none transition focus:border-freego-teal focus:ring-4 focus:ring-freego-teal/10";

  return (
    <section id="book" className="section-spacing bg-freego-ivory">
      <div className="container-freego">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3">{b.eyebrow}</p>
          <h2 className="text-3xl font-black leading-[1.18] text-freego-teal md:text-[2.6rem]">
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
                    <div
                      className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${regionGradients[item.region]}`}
                    >
                      <span className="text-6xl drop-shadow">{item.emoji}</span>
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-freego-teal">
                        {lang === "zh"
                          ? regionsMeta[item.region].zh
                          : regionsMeta[item.region].en}
                        ・{item.days}
                        {b.daysUnit}
                      </span>
                      {item.popular ? (
                        <span className="absolute right-4 top-4 rounded-full bg-freego-orange px-3 py-1 text-xs font-black text-freego-ink">
                          🔥 {b.popularTag}
                        </span>
                      ) : null}
                    </div>
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
                  {lang === "zh"
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

            <button
              type="button"
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-freego bg-freego-orange px-6 font-bold text-freego-ink shadow-[0_12px_28px_rgba(242,140,56,0.24)] transition hover:-translate-y-0.5 hover:bg-[#e77b24] sm:w-auto"
            >
              {b.nextBtn2}
            </button>
          </div>
        ) : null}

        {/* Step 3: 確認付款 */}
        {step === 3 && pkg && vehicleId && quote ? (
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
                  {date}・{pkg.days}
                  {b.daysUnit}
                </p>
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
              <p className="mt-4 text-xs leading-5 text-white/60">{b.terms}</p>
              <p className="mt-2 rounded-freego bg-white/10 p-2.5 text-xs leading-5 text-white/75">
                {b.testNote}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
