"use client";

import { useLang } from "@/lib/i18n";
import { Button } from "./Button";

export function HeroSection() {
  const { t } = useLang();
  const hero = t.hero;

  return (
    <section
      id="top"
      className="min-h-[calc(100vh-88px)] overflow-hidden bg-freego-ivory pb-20 pt-[72px]"
    >
      <div className="container-freego">
        <div className="mx-auto max-w-6xl animate-fade-up">
          <p className="eyebrow mb-4 text-center md:text-left">
            {hero.eyebrow}
          </p>

          <h1 className="sr-only">
            {hero.titleLines[0]}
            {hero.titleLines[1]}
            {hero.titleAccent}
          </h1>

          <div className="relative overflow-hidden rounded-freego border border-white bg-white p-3 shadow-soft">
            <img
              src="/hero-joe-companion.png"
              alt="FreeGO Taiwan Travel Companion JOE 永 introducing Taiwan travel to a visitor"
              className="block w-full rounded-[20px] object-cover"
            />
          </div>

          <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-3xl text-[1.05rem] leading-8 text-freego-ink/72 md:text-lg">
              {hero.description}
            </p>
            <div className="flex flex-col gap-3 pb-2 sm:flex-row sm:flex-wrap lg:justify-end">
              <Button href="#book">{hero.ctaPrimary}</Button>
              <Button href="#companion" variant="secondary">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
