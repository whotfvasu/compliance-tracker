/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary #333 and light variants
        dark: {
          50: "#f5f5f5",
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#9e9e9e",
          500: "#757575",
          600: "#616161",
          700: "#424242",
          800: "#333333",
          900: "#212121",
        },
        // Greyish greenish black (sage/moss palette)
        sage: {
          50: "#f6f7f6",
          100: "#e8ebe8",
          200: "#d5dcd4",
          300: "#b8c3b5",
          400: "#8fa08b",
          500: "#6b8365",
          600: "#556b52",
          700: "#425741",
          800: "#2f403d",
          900: "#1a2824",
        },
        // Red for high-risk items
        risk: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
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
