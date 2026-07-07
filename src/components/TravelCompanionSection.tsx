"use client";

import {
  HeartHandshake,
  MessageSquareText,
  Route,
  Sparkles
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

const cardIcons: LucideIcon[] = [
  MessageSquareText,
  Route,
  Sparkles,
  HeartHandshake
];

export function TravelCompanionSection() {
  const { t } = useLang();
  const c = t.companion;

  return (
    <section id="companion" className="section-spacing bg-freego-teal">
      <div className="container-freego">
        <SectionTitle
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.description}
          inverted
        />
        <div className="mt-12 overflow-hidden rounded-freego border border-white/12 bg-white">
          <div className="grid bg-freego-orange text-lg font-black text-freego-ink md:grid-cols-2">
            <div className="p-5">{c.driverLabel}</div>
            <div className="border-t border-freego-ink/10 p-5 md:border-l md:border-t-0">
              {c.companionLabel}
            </div>
          </div>
          <div className="hidden md:block">
            {c.rows.map(([driver, companion]) => (
              <div
                key={driver}
                className="grid grid-cols-2 border-t border-freego-gray"
              >
                <div className="p-5 leading-7 text-freego-ink/65">{driver}</div>
                <div className="border-l border-freego-gray bg-freego-ivory/55 p-5 font-bold leading-7 text-freego-teal">
                  {companion}
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 p-4 md:hidden">
            <article className="rounded-freego border border-freego-gray bg-white p-5">
              <h3 className="text-lg font-black text-freego-ink">
                {c.driverLabel}
              </h3>
              <ul className="mt-4 grid gap-3 text-base leading-7 text-freego-ink/68">
                {c.rows.map(([driver]) => (
                  <li key={driver}>• {driver}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-freego border border-freego-orange/35 bg-freego-ivory p-5">
              <h3 className="text-lg font-black text-freego-teal">
                {c.companionLabel}
              </h3>
              <ul className="mt-4 grid gap-3 text-base font-bold leading-7 text-freego-teal">
                {c.rows.map(([, companion]) => (
                  <li key={companion}>• {companion}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-3xl font-black leading-tight text-white">
            {c.quoteLines[0]}
            <br />
            {c.quoteLines[1]}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.cards.map((title, index) => {
            const Icon = cardIcons[index];
            return (
              <div
                key={title}
                className="rounded-freego border border-white/12 bg-white/8 p-5 text-white transition duration-200 hover:-translate-y-1 hover:bg-white/12"
              >
                <Icon className="mb-4 h-6 w-6 text-freego-orange" />
                <p className="font-black">{title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
