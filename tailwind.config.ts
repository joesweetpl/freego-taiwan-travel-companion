import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        freego: {
          teal: "#0F4C4C",
          orange: "#F28C38",
          ivory: "#F8F3EA",
          ink: "#1F2A2A",
          gray: "#D8DDD8",
          white: "#FFFFFF"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 76, 76, 0.12)",
        lift: "0 18px 44px rgba(15, 76, 76, 0.16)"
      },
      borderRadius: {
        freego: "8px"
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans TC",
          "Noto Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
