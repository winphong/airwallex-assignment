import { ThemeProvider } from "styled-components";
import { Header } from "@/components/Header";
import { theme } from "./theme";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div>
          <Header />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
