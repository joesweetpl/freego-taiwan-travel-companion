"use client";

import { useLang } from "@/lib/i18n";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";

export function HowItWorksSection() {
  const { t } = useLang();
  const how = t.how;

  return (
    <section className="section-spacing bg-white">
      <div className="container-freego">
        <SectionTitle
          eyebrow={how.eyebrow}
          title={how.title}
          description={how.description}
        />
        <div className="relative mt-14 grid gap-5 pl-16 before:absolute before:bottom-0 before:left-8 before:top-0 before:w-px before:bg-freego-orange/40 lg:grid-cols-5 lg:pl-0 lg:before:left-0 lg:before:right-0 lg:before:top-6 lg:before:h-px lg:before:w-auto">
          {how.steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-freego border border-freego-gray bg-freego-ivory p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="absolute -left-14 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-freego-orange text-lg font-black text-freego-ink lg:static lg:mb-6">
                {index + 1}
              </span>
              <h3 className="text-xl font-black leading-tight text-freego-teal">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-[1.75] text-freego-ink/70">
                {step.copy}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-3xl font-black text-freego-teal">{how.ctaTitle}</p>
          <Button href="#plan">{how.cta}</Button>
        </div>
      </div>
    </section>
  );
}
