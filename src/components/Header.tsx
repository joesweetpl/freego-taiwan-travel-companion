"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const langToggle = (
    <div className="flex items-center rounded-full border border-freego-gray bg-white p-1 text-xs font-black">
      {(["zh", "en"] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setLang(value)}
          className={`rounded-full px-3 py-1.5 transition ${
            lang === value
              ? "bg-freego-teal text-white"
              : "text-freego-ink/55 hover:text-freego-teal"
          }`}
        >
          {value === "zh" ? "中文" : "EN"}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-freego-gray/70 bg-freego-ivory/92 backdrop-blur-xl">
      <div className="container-freego flex h-20 items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-semibold text-freego-ink/78 lg:flex">
          {t.nav.items.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-freego-orange">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {langToggle}
          <Button href="#book" className="min-h-11 px-4 py-2">
            {t.nav.cta}
          </Button>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          {langToggle}
          <button
            type="button"
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-freego border border-freego-gray bg-white text-freego-teal"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-freego-gray bg-freego-ivory px-4 pb-5 lg:hidden">
          <nav className="mx-auto flex max-w-xl flex-col py-3 text-base font-semibold text-freego-ink">
            {t.nav.items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="border-b border-freego-gray/70 py-3 transition hover:text-freego-orange"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <Button href="#book" full>
            {t.nav.ctaMobile}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
