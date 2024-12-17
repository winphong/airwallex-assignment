import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: Avenir, sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, pre {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
