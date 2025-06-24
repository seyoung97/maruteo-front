import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = {
  ...defaultConfig,
  initialColorMode: "light", 
  useSystemColorMode: false, 
};

const customConfig = defineConfig({
  globalCss: {
    "html, body, #root": {
      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
      overflowX: "hidden",
      fontSize: "16px",
      lineHeight: "1.5",
      WebkitOverflowScrolling: "touch",
      overscrollBehavior: "none",
    },
    "*::placeholder": {
      opacity: 1,
      color: "fg.subtle",
    },
    "*::selection": {
      bg: "blue.200",
    },
    "a": {
      all: "unset",
      cursor: "pointer",
      color: "inherit",
      touchAction: "manipulation",
    },
    "*": {
      boxSizing: "border-box",
    },
    "body": {
      WebkitTapHighlightColor: "transparent",
      touchAction: "manipulation",
      backgroundColor: "white",
    },
  },
  theme: {
    breakpoints: {
      sm: "480px",
      md: "768px",
    },
    tokens: {
      colors: {
        primary: { value: "#22c55e" },
        secondary: { value: "#4ade80" },
        mobile: {
          bg: { value: "#f9fafb" },
          surface: { value: "#ffffff" },
          border: { value: "#e5e7eb" },
          text: { value: "#111827" },
          textMuted: { value: "#6b7280" },
          primary: { value: "#3182ce" },
          primaryHover: { value: "#2563eb" },
          success: { value: "#10b981" },
          error: { value: "#ef4444" },
          warning: { value: "#f59e0b" },
        }
      },
    },
    semanticTokens: {
      colors: {
        "mobile.bg": { value: "#f9fafb" },
        "mobile.surface": { value: "#ffffff" },
        "mobile.border": { value: "#e5e7eb" },
        "mobile.text": { value: "#111827" },
        "mobile.textMuted": { value: "#6b7280" },
        "mobile.primary": { value: "#3182ce" },
        "mobile.primaryHover": { value: "#2563eb" },
        "mobile.success": { value: "#10b981" },
        "mobile.error": { value: "#ef4444" },
        "mobile.warning": { value: "#f59e0b" },
      },
    }
  },
});

export const system = createSystem(config, customConfig);