"use client";

import { CarFront, Map, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";

const icons: LucideIcon[] = [Map, MessagesSquare, CarFront];

export function SolutionSection() {
  const { t } = useLang();
  const solution = t.solution;

  return (
    <section id="guide" className="section-spacing bg-freego-ivory">
      <div className="container-freego">
        <SectionTitle
          eyebrow={solution.eyebrow}
          title={solution.title}
          description={solution.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {solution.services.map(({ title, copy }, index) => {
            const Icon = icons[index];
            return (
              <article
                key={title}
                className="rounded-freego border border-freego-gray bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-freego-teal text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-2xl font-black text-freego-teal">{title}</h3>
                <p className="mt-5 text-base leading-[1.75] text-freego-ink/72">
                  {copy}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-freego bg-freego-teal p-6 text-white md:flex-row md:p-8">
          <p className="text-2xl font-black leading-snug">
            {solution.bannerTitle}
          </p>
          <Button href="#plan" variant="light" className="shrink-0">
            {solution.bannerCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
