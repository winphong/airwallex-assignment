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
  },
} as const;

export type ITheme = typeof theme;
