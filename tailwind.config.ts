import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        heading: ["clamp(1.35rem, 4.5vw, 2.5rem)", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};

export default config;
