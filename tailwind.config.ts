import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ========================================================================
      // COLORS: Luxury parfum brand palette
      // ========================================================================
      colors: {
        // Primary: Warm gold (elegance, luxury)
        amber: {
          50: "#fffbf0",
          100: "#fff7e6",
          200: "#ffeccc",
          300: "#ffe0b3",
          400: "#ffd699",
          500: "#ffcc80", // Primary brand color
          600: "#ffb94d",
          700: "#ff9f1a",
          800: "#e68900",
          900: "#cc7700",
        },
        // Neutrals: Refined grays (premium look)
        neutral: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e7e7e7",
          300: "#d1d1d1",
          400: "#b4b4b4",
          500: "#a0a0a0",
          600: "#737373",
          700: "#525252",
          800: "#2f2f2f",
          900: "#000000",
        },
        // Accents
        rose: {
          50: "#fff5f7",
          600: "#e11d48",
        },
      },

      // ========================================================================
      // TYPOGRAPHY: Premium serif + clean sans
      // ========================================================================
      fontFamily: {
        serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // Scaled typography for luxury aesthetics
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ========================================================================
      // SPACING: Refined grid (4px base)
      // ========================================================================
      spacing: {
        0: "0",
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        7: "1.75rem", // 28px
        8: "2rem", // 32px
        9: "2.25rem", // 36px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        14: "3.5rem", // 56px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
        28: "7rem", // 112px
        32: "8rem", // 128px
        36: "9rem", // 144px
        40: "10rem", // 160px
        44: "11rem", // 176px
        48: "12rem", // 192px
        52: "13rem", // 208px
        56: "14rem", // 224px
        60: "15rem", // 240px
        64: "16rem", // 256px
        72: "18rem", // 288px
        80: "20rem", // 320px
        96: "24rem", // 384px
      },

      // ========================================================================
      // SHADOWS: Refined, luxury
      // ========================================================================
      boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        md: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        xl: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
        // Luxury shadow for elevated elements
        luxury: "0 20px 40px rgba(0, 0, 0, 0.15)",
      },

      // ========================================================================
      // BORDER RADIUS: Minimal, sophisticated
      // ========================================================================
      borderRadius: {
        none: "0",
        sm: "0.125rem", // 2px
        base: "0.25rem", // 4px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },

      // ========================================================================
      // TRANSITIONS: Smooth, premium feel
      // ========================================================================
      transitionDuration: {
        0: "0ms",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
      },
      transitionTimingFunction: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        // Custom easing for luxury feel
        "ease-luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },

      // ========================================================================
      // ANIMATION: Subtle, purposeful
      // ========================================================================
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        slideUp: "slideUp 0.4s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      // ========================================================================
      // Z-INDEX: Structured hierarchy
      // ========================================================================
      zIndex: {
        auto: "auto",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        base: "100",
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },

      // ========================================================================
      // CONTAINER: Responsive max-width
      // ========================================================================
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "5rem",
        },
      },
    },
  },

  // ============================================================================
  // PLUGINS
  // ============================================================================
  plugins: [
    // Typography plugin (optional, for prose styling)
    // require('@tailwindcss/typography'),
    // Forms plugin (optional, for form styling)
    // require('@tailwindcss/forms'),
    // Aspect ratio plugin
    // require('@tailwindcss/aspect-ratio'),
  ],

  // ============================================================================
  // TAILWIND CONFIG OPTIONS
  // ============================================================================
  important: false, // Don't use !important unless necessary
  corePlugins: {
    preflight: true, // Include Tailwind's reset
  },
  safelist: [
    // Add dynamic classes here if you use string concatenation
    // (not recommended, but sometimes necessary)
  ],
};

export default config;
