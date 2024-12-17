import { ThemeProvider } from "styled-components";
import { Header } from "@/components/Header";
import { theme } from "@/theme";
import GlobalStyles from "@/GlobalStyles";
import { Content } from "@/pages/Content";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <section>
          <Content />
        </section>
      </ThemeProvider>
    </>
  );
}

export default App;
