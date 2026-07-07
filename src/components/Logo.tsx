import Image from "next/image";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="FreeGO home">
      <Image
        src="/logo-mark.png"
        alt="FreeGO logo"
        width={44}
        height={54}
        className="h-12 w-auto"
        priority
      />
      <span className="leading-tight">
        <span className="block text-xl font-black">
          <span className={inverted ? "text-white" : "text-freego-teal"}>
            Free
          </span>
          <span className="text-freego-orange">GO</span>
        </span>
        <span
          className={`block text-xs font-semibold ${
            inverted ? "text-white/72" : "text-freego-ink/62"
          }`}
        >
          Taiwan Travel Companion
        </span>
      </span>
    </a>
  );
}
