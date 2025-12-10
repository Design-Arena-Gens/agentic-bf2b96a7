import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "var(--font-sans)"]
      },
      colors: {
        surface: {
          100: "#0f172a",
          200: "#111c2e",
          300: "#1e293b"
        }
      },
      backgroundSize: {
        "size-200": "200% 200%"
      }
    }
  },
  plugins: []
};

export default config;
