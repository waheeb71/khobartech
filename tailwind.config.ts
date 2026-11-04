import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0b1628",
        "navy-mid": "#0f1f3d",
        "navy-card": "#111f38",
        cyan: "#00d4e8",
        "cyan-dark": "#00b8cc",
        royal: "#00d4e8",
        blue: "#0066ff",
        muted: "#8ba0be",
        paper: "#0b1628",
        mist: "#0f1f3d",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "sans-serif"],
        latin: ["var(--font-latin)", "sans-serif"],
      },
      boxShadow: {
        "line-soft": "0 20px 55px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
