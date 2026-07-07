"use client";

import {
  Baby,
  BriefcaseBusiness,
  Coffee,
  Heart,
  Landmark,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

const icons: LucideIcon[] = [
  Baby,
  Heart,
  Landmark,
  Users,
  Coffee,
  BriefcaseBusiness
];

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
];

export function AudienceSection() {
  const { t } = useLang();
  const audience = t.audience;

  return (
    <section id="become" className="section-spacing bg-freego-ivory">
      <div className="container-freego">
        <SectionTitle
          eyebrow={audience.eyebrow}
          title={audience.title}
          description={audience.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audience.items.map(({ title, copy }, index) => {
            const Icon = icons[index];
            return (
              <article
                key={title}
                className="overflow-hidden rounded-freego border border-freego-gray bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[index]})` }}
                />
                <div className="p-6 text-left">
                  <Icon className="mb-4 h-7 w-7 text-freego-orange" />
                  <h3 className="text-2xl font-black text-freego-teal">
                    {title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.75] text-freego-ink/70">
                    {copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-12 rounded-freego border border-freego-gray bg-white p-7 text-center shadow-soft">
          <p className="text-2xl font-black text-freego-teal">
            {audience.calloutTitle}
          </p>
          <p className="mt-3 text-lg font-bold text-freego-ink/70">
            {audience.calloutCopy}
          </p>
        </div>
      </div>
    </section>
  );
}
