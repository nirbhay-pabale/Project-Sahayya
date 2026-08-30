import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: "#F0FDF4",
            100: "#DCFCE7",
            200: "#BBF7D0",
            600: "#16A34A",
            700: "#14532D",
            900: "#0F3D2E",
          },
        },
        "brand-green": {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          600: "#16A34A",
          700: "#14532D",
          900: "#0F3D2E",
        },
        "text-slate": {
          600: "#475569",
          900: "#0F172A",
        },
        "surface-white": "#FFFFFF",
        "border-green-200": "#BBF7D0",
        "chart-blue-500": "#3B82F6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
        floating: "0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)",
        phone: "0 25px 60px -15px rgba(15, 61, 46, 0.35), 0 10px 20px -5px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
