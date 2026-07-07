"use client";

import { AlertCircle, Compass, ListChecks } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

const icons: LucideIcon[] = [AlertCircle, Compass, ListChecks];

export function PainPointSection() {
  const { t } = useLang();
  const pain = t.pain;

  return (
    <section id="about" className="section-spacing bg-white">
      <div className="container-freego">
        <SectionTitle
          eyebrow={pain.eyebrow}
          title={pain.title}
          description={pain.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pain.points.map(({ title, copy }, index) => {
            const Icon = icons[index];
            return (
              <article
                key={title}
                className="rounded-freego border border-freego-gray bg-freego-ivory p-7 transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <Icon className="mb-5 h-8 w-8 text-freego-orange" />
                <h3 className="text-2xl font-black leading-tight text-freego-teal">
                  {title}
                </h3>
                <p className="mt-5 text-base leading-[1.75] text-freego-ink/70">
                  {copy}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-freego border border-freego-orange/35 bg-freego-orange/10 p-7 text-center">
          <p className="text-2xl font-black leading-snug text-freego-teal">
            {pain.calloutTop}
            <br />
            <span className="text-freego-orange">{pain.calloutAccent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
