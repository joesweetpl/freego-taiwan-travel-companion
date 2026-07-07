"use client";

import { ArrowRight, Instagram, NotebookText } from "lucide-react";
import { useState } from "react";
import {
  foodRegions,
  foodSpots,
  foodUpdatedAt,
  type FoodRegionId
} from "@/lib/foodspots";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

const regionGradients: Record<FoodRegionId, string> = {
  taipei: "from-freego-teal to-[#1a6b6b]",
  yilan: "from-[#57825b] to-[#789f73]",
  taoyuan: "from-[#1e5a8a] to-[#3a7ab5]",
  taichung: "from-[#8a5a1e] to-freego-orange",
  chiayi: "from-[#3d6b35] to-[#5a8a4a]",
  tainan: "from-[#b3541e] to-[#c56a2a]",
  kaohsiung: "from-[#1f2a2a] to-freego-teal",
  hualien: "from-[#247f8d] to-[#3a9ab5]"
};

export function FoodSpotsSection() {
  const { lang, t } = useLang();
  const food = t.food;
  const [region, setRegion] = useState<FoodRegionId>("taipei");

  const spots = foodSpots.filter((spot) => spot.region === region);

  return (
    <section id="food" className="section-spacing bg-white">
      <div className="container-freego">
        <SectionTitle
          eyebrow={food.eyebrow}
          title={food.title}
          description={food.description}
        />
        <p className="mt-4 text-center text-xs font-bold text-freego-ink/45">
          🔄 {food.updatedLabel}：{foodUpdatedAt}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {foodRegions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRegion(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                region === item.id
                  ? "border-freego-teal bg-freego-teal text-white"
                  : "border-freego-gray bg-white text-freego-ink/65 hover:border-freego-orange hover:text-freego-orange"
              }`}
            >
              {lang === "zh" ? item.zh : item.en}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {spots.map((spot) => (
            <article
              key={spot.id}
              className="flex flex-col overflow-hidden rounded-freego border border-freego-gray bg-freego-ivory transition duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <div
                className={`flex h-28 items-center justify-center bg-gradient-to-br ${regionGradients[spot.region]}`}
              >
                <span className="text-5xl drop-shadow">{spot.emoji}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-freego-orange/15 px-3 py-1 text-xs font-black text-freego-orange">
                  {lang === "zh" ? spot.tagZh : spot.tagEn}
                </span>
                <h3 className="mt-3 text-lg font-black leading-tight text-freego-teal">
                  {lang === "zh" ? spot.nameZh : spot.nameEn}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-freego-ink/70">
                  {lang === "zh" ? spot.descZh : spot.descEn}
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(spot.nameZh.replace(/（.*?）/g, ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-freego border border-freego-teal/25 bg-white px-3 py-2 text-xs font-bold text-freego-teal transition hover:border-freego-orange hover:text-freego-orange"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    {food.igBtn}
                  </a>
                  <a
                    href={`https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(spot.nameZh.replace(/（.*?）/g, ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-freego border border-freego-teal/25 bg-white px-3 py-2 text-xs font-bold text-freego-teal transition hover:border-freego-orange hover:text-freego-orange"
                  >
                    <NotebookText className="h-3.5 w-3.5" />
                    {food.xhsBtn}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center">
          <a
            href="#book"
            className="inline-flex items-center gap-1.5 font-bold text-freego-orange underline"
          >
            {food.addToTrip}
            <ArrowRight className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
}
