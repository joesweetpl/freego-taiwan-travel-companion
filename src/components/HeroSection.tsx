"use client";

import {
  CarFront,
  Languages,
  MapPinned,
  MessageCircleHeart,
  ShieldCheck,
  Star,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "./Button";

const trustIcons: LucideIcon[] = [
  MapPinned,
  MessageCircleHeart,
  CarFront,
  UsersRound
];

const statIcons: LucideIcon[] = [CarFront, Star, ShieldCheck, Languages];

export function HeroSection() {
  const { t } = useLang();
  const hero = t.hero;

  return (
    <section
      id="top"
      className="min-h-[calc(100vh-88px)] overflow-hidden bg-freego-ivory pb-24 pt-[72px]"
    >
      <div className="container-freego grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="animate-fade-up">
          <p className="eyebrow mb-4">{hero.eyebrow}</p>
          <p className="mb-5 max-w-2xl text-base font-bold leading-7 text-freego-orange md:text-lg">
            {hero.tagline}
          </p>
          <h1 className="max-w-3xl text-[clamp(38px,11vw,54px)] font-black leading-[1.08] text-freego-teal md:text-[clamp(50px,5.6vw,78px)] md:leading-[1.05]">
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
            <br />
            <span className="text-freego-orange">{hero.titleAccent}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-freego-ink/72 md:text-lg">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 pb-2 sm:flex-row sm:flex-wrap">
            <Button href="#book">{hero.ctaPrimary}</Button>
            <Button href="#companion" variant="secondary">
              {hero.ctaSecondary}
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {hero.trustTags.map(([title, sub], index) => {
              const Icon = trustIcons[index];
              return (
                <div
                  key={title}
                  className="rounded-freego border border-freego-gray bg-white/76 p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lift"
                >
                  <Icon className="mb-3 h-5 w-5 text-freego-orange" />
                  <p className="text-base font-black text-freego-teal">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-freego-ink/65">{sub}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative animate-fade-up-delay">
          <div className="relative overflow-hidden rounded-freego bg-white p-4 shadow-soft">
            <div className="min-h-[420px] rounded-freego bg-[linear-gradient(145deg,rgba(248,243,234,0.08),rgba(242,140,56,0.18)),url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=82')] bg-cover bg-center md:min-h-[520px]" />
            <div className="absolute left-7 top-7 max-w-[250px] rounded-freego bg-white/94 p-4 shadow-soft backdrop-blur">
              <p className="text-xs font-black uppercase text-freego-orange">
                {hero.photoBadgeTitle}
              </p>
              <p className="mt-2 text-lg font-black leading-tight text-freego-teal">
                {hero.photoBadgeCopy}
              </p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-freego bg-white/92 p-5 text-freego-ink shadow-soft backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {hero.stats.map(([value, label], index) => {
                  const Icon = statIcons[index];
                  return (
                    <div key={label} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-freego-orange" />
                      <div>
                        <p className="font-black text-freego-teal">{value}</p>
                        <p className="text-xs text-freego-ink/62">{label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
