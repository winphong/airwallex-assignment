/* eslint-disable no-restricted-imports */
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import GlobalStyles from "@/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";

const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
