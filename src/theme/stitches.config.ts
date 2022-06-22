import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

const stitches = createStitches({
  theme: {
    colors: {
      hiContrast: "hsl(206,10%,5%)",
      loContrast: "white",
      gray100: "hsl(206,22%,99%)",
      gray200: "hsl(206,12%,97%)",
      gray300: "hsl(206,11%,92%)",
      gray400: "hsl(206,10%,84%)",
      gray500: "hsl(206,10%,76%)",
      gray600: "hsl(206,10%,44%)",
      primary: "crimson",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xl2: "1.5rem",
      xl3: "1.875rem",
      xl4: "2.25rem",
      xl5: "3rem",
      xl6: "3.75rem",
      xl7: "4.5rem",
      xl8: "6rem",
      xl9: "8rem",
    },
    sizes: {
      md: "1rem",
      xs: "0.5rem",
    },
    space: {
      md: "1rem",
    },
    transitions: {
      default: "  .4s",
    },
  },
  utils: {
    height: (value) => {
      return { height: value };
    },
  },
});

const config = stitches.config;

const {
  styled,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  theme,
} = stitches;

export {
  styled,
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  theme,
};
export type CSS = Stitches.CSS<typeof config>;
