import { DefaultTheme } from "styled-components";

export const theme = {
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "1024px",
    lg: "1200px",
    xl: "1440px",
  },
  color: {
    black: "#000000",
    gray1: "#5E5E5E",
    gray2: "#9B9B9B",
    gray3: "#C2C2C2",
    gray4: "#D9D9D9",
    gray5: "#F1EFEF",
    white: "#FFFFFF",
    red: "#C30010",
    scarlet: "#ff2400",
    lime: "#32CD32",
  },
  fontSizes: {
    base: "16px",
    mega: "40px",
    giga: "60px",
  },
} as const;

export const media = (breakpoint: keyof DefaultTheme["breakpoints"]) => {
  return ({ theme }: { theme: DefaultTheme }) =>
    `@media (max-width: ${theme.breakpoints[breakpoint]})`;
};
export type ITheme = typeof theme;
