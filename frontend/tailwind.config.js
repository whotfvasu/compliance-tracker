/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
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
