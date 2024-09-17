import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "../colorcar/node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    wrapper: {
      base: "max-w-6xl m-auto",
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1130px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "511px" },
    },
    extend: {
      colors: {
        alphablack: "rgba(14, 14, 14, 0.6);",
        "orange-brdr": "#C53720",
      },
      gridTemplateColumns: {
        block: "repeat(auto-fit, minmax(250px, 1fr));",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
