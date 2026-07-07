"use client";

import { useLang } from "@/lib/i18n";

export function PremiumTrustSection() {
  const { lang, t } = useLang();
  const hero = t.hero;
  const posterSrc =
    lang === "en"
      ? "/premium-standard-poster-en.png"
      : "/premium-standard-poster-zh.png";

  return (
    <section className="overflow-hidden bg-freego-teal py-16 text-white md:py-20">
      <div className="container-freego">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-freego border border-white/18 bg-freego-ink/28 p-2 shadow-[0_28px_80px_rgba(0,0,0,0.26)] md:p-3">
          <img
            src={posterSrc}
            alt={hero.trustSectionTitle}
            className="block w-full rounded-[20px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
