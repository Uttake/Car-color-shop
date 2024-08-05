import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    wrapper: {
      base: 'max-w-6xl m-auto'
    },
    extend: {
      colors:{
        alphablack:'rgba(14, 14, 14, 0.6);'
      }
    },
  },
  plugins: [],
};
export default config;
