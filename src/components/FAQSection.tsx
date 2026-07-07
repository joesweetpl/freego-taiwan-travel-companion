"use client";

import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

export function FAQSection() {
  const { t } = useLang();
  const faq = t.faq;

  return (
    <section id="faq" className="section-spacing bg-white">
      <div className="container-freego">
        <SectionTitle
          eyebrow={faq.eyebrow}
          title={faq.title}
          description={faq.description}
        />
        <div className="mx-auto mt-12 grid max-w-3xl gap-3">
          {faq.items.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-freego border border-freego-gray bg-freego-ivory transition open:border-freego-teal/30 open:bg-white open:shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-black text-freego-teal [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="h-5 w-5 shrink-0 text-freego-orange transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-6 text-base leading-[1.85] text-freego-ink/72">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
