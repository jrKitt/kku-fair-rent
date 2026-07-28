import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // KKU brand — wine red / maroon
        kku: {
          DEFAULT: "#8a1538",
          dark: "#6b0f2b",
          light: "#b34a67",
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
