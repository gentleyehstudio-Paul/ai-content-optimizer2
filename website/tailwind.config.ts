import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#191a18",
        paper: "#eeede8",
        "paper-alt": "#f7f6f2",
        dark: "#1e261f",
        "near-black": "#050505",
        red: "#a63328",
        hairline: "#d8d9d1",
        "text-secondary": "#5d645b",
        "text-muted": "#4e554e",
      },
      fontFamily: {
        sans: [
          "Manrope",
          "PingFang TC",
          "Noto Sans TC",
          "Microsoft JhengHei",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1280px",
        faq: "880px",
        narrow: "760px",
      },
      borderRadius: {
        card: "14px",
        panel: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
