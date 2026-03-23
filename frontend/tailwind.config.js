/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: [
          "Nohemi",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["11px", "16px"],
        sm: ["12px", "16px"],
        base: ["14px", "20px"],
        lg: ["16px", "20px"],
        xl: ["18px", "24px"],
        "2xl": ["24px", "32px"],
      },
      spacing: {
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
      },
    },
  },
  plugins: [],
};
