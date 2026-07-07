"use client";

import {
  CalendarCheck,
  CarFront,
  ConciergeBell,
  Crown,
  Languages,
  MapPinned,
  Plane,
  Ticket,
  UserRoundCheck,
  UtensilsCrossed
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";

const cardIcons: LucideIcon[] = [
  CarFront,
  UserRoundCheck,
  ConciergeBell,
  Crown
];

const badgeIcons: LucideIcon[] = [
  Plane,
  MapPinned,
  Languages,
  CalendarCheck,
  UtensilsCrossed,
  Ticket
];

export function FleetSection() {
  const { t } = useLang();
  const fleet = t.fleet;

  return (
    <section id="fleet" className="section-spacing bg-white">
      <div className="container-freego">
        <SectionTitle
          eyebrow={fleet.eyebrow}
          title={fleet.title}
          description={fleet.description}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.cards.map(({ title, copy }, index) => {
            const Icon = cardIcons[index];
            return (
              <article
                key={title}
                className="rounded-freego border border-freego-gray bg-freego-ivory p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-freego-teal text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-black leading-tight text-freego-teal">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-[1.75] text-freego-ink/70">
                  {copy}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {fleet.badges.map((badge, index) => {
            const Icon = badgeIcons[index];
            return (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-freego-teal/20 bg-freego-ivory px-4 py-2 text-sm font-bold text-freego-teal"
              >
                <Icon className="h-4 w-4 text-freego-orange" />
                {badge}
              </span>
            );
          })}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-freego bg-freego-teal p-6 text-white md:flex-row md:p-8">
          <div>
            <p className="text-2xl font-black leading-snug">
              {fleet.bannerTitle}
            </p>
            <p className="mt-2 text-white/75">{fleet.bannerCopy}</p>
          </div>
          <Button href="#plan" variant="light" className="shrink-0">
            {fleet.bannerCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
