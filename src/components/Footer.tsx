"use client";

import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Youtube
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";
import { LINE_URL, WHATSAPP_URL } from "@/lib/translations";
import { Logo } from "./Logo";

const channels: Array<[string, LucideIcon, string, boolean]> = [
  ["LINE", MessageCircle, LINE_URL, true],
  ["WhatsApp", MessageCircle, WHATSAPP_URL, true],
  ["Email", Mail, "mailto:happyride1688@gmail.com", false],
  ["Instagram", Instagram, "#contact", false],
  ["Facebook", Facebook, "#contact", false],
  ["YouTube", Youtube, "#contact", false],
  ["TikTok", Music2, "#contact", false],
  ["Xiaohongshu", MessageCircle, "#contact", false]
];

export function Footer() {
  const { t } = useLang();
  const footer = t.footer;

  return (
    <footer id="contact" className="bg-freego-ink py-14 text-white">
      <div className="container-freego">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr_0.9fr]">
          <div>
            <Logo inverted />
            <p className="mt-6 max-w-sm text-2xl font-black leading-tight">
              {footer.slogan}
            </p>
            <p className="mt-3 text-white/68">{footer.sloganSub}</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
              {footer.fleetNote}
            </p>
          </div>
          <nav className="grid content-start gap-3 sm:grid-cols-2">
            {footer.menu.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-white/72 transition hover:text-freego-orange"
              >
                {label}
              </a>
            ))}
          </nav>
          <div>
            <p className="mb-4 font-black text-freego-orange">
              {footer.contactTitle}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {channels.map(([label, Icon, href, external]) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  onClick={() =>
                    trackEvent("contact_click", {
                      contact_channel: label.toLowerCase(),
                      contact_location: "footer"
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-freego border border-white/12 px-3 py-2 text-sm text-white/72 transition hover:border-freego-orange hover:text-freego-orange"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/45">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
