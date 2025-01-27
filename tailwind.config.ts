import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-sea-green": "#2F4F4F",
        "dark-salmon": "#E9967A",
        "pt-green": "#3A7475",
        primary: {
          DEFAULT: "#FF7C54",
          50: "#FFF6F3",
          100: "#FFE9E2",
          200: "#FFD0BF",
          300: "#FFB79C",
          400: "#FF9E79",
          500: "#FF7C54",
          600: "#FF5A21",
          700: "#ED3B00",
          800: "#BA2F00",
          900: "#872200",
          950: "#5C1700",
        },
        "custom-gray": "#E9EAE8",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        "geist-sans": ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"],
        "jedira-regular": ["var(--font-jedira-regular)"],
        "jedira-italic": ["var(--font-jedira-italic)"],
      },
    },
  },
  plugins: [],
};

export default config;
