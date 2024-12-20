import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: Avenir, sans-serif;
    font-weight: 500;
    background-color: rgb(250,250,250);
  }

  h1, h2, h3, h4, h5, h6, p, pre, span {
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
`;

export default GlobalStyles;
