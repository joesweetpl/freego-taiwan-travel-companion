"use client";

import { Quote, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

export function TestimonialsSection() {
  const { t } = useLang();
  const reviews = t.reviews;

  return (
    <section id="reviews" className="section-spacing bg-freego-ivory">
      <div className="container-freego">
        <SectionTitle
          eyebrow={reviews.eyebrow}
          title={reviews.title}
          description={reviews.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.items.map(({ quote, name, origin }) => (
            <figure
              key={name}
              className="flex flex-col rounded-freego border border-freego-gray bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <Quote className="mb-5 h-8 w-8 text-freego-orange" />
              <blockquote className="flex-1 text-base leading-[1.85] text-freego-ink/80">
                {quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-freego-gray pt-5">
                <div className="mb-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-freego-orange text-freego-orange"
                    />
                  ))}
                </div>
                <p className="font-black text-freego-teal">{name}</p>
                <p className="mt-1 text-sm text-freego-ink/60">{origin}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
