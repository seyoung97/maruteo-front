import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    "*::placeholder": {
      opacity: 1,
      color: "fg.subtle",
    },
    "*::selection": {
      bg: "green.200",
    },
    "a": {
      all: "unset",
      cursor: "pointer",
      color: "inherit",
    },
    "*": {
      boxSizing: "border-box",
    },
  },
  theme:{
    tokens: {
      colors: {
       primary: { value: "#4ade80" },
        secondary: { value: "#22c55e" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)