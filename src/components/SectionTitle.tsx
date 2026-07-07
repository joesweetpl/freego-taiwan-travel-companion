type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false
}: SectionTitleProps) {
  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2
        className={`text-3xl font-black leading-[1.18] md:text-[2.6rem] ${
          inverted ? "text-white" : "text-freego-teal"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-8 md:text-[1.08rem] ${
            inverted ? "text-white/75" : "text-freego-ink/72"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
