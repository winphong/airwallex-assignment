import { ThemeProvider } from "styled-components";
import { Header } from "@/ui/Header";
import { theme } from "@/theme";
import GlobalStyles from "@/GlobalStyles";
import { Content } from "@/pages/Content";
import ToastProvider from "@/organism/ToastProvider";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <section>
          <Content />
        </section>
        <ToastProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
