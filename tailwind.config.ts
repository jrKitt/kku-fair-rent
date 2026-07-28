import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // KKU brand — official university color
        kku: {
          DEFAULT: "#A73B24", // C24 M88 Y99 K17 | R167 G59 B36
          dark: "#7d2c1b",
          light: "#c4624e",
          50: "oklch(0.97 0.01 30)",
          100: "oklch(0.94 0.02 30)",
          200: "oklch(0.87 0.04 30)",
          300: "oklch(0.76 0.08 30)",
          400: "oklch(0.63 0.12 30)",
          500: "#A73B24", // base
          600: "oklch(0.42 0.10 30)",
          700: "oklch(0.32 0.08 30)",
          800: "oklch(0.24 0.06 30)",
          900: "oklch(0.18 0.04 30)",
          950: "oklch(0.12 0.02 30)",
        },
        line: {
          DEFAULT: "#06c755",
          dark: "#04a544",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-thai)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
