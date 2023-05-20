import Layout from "@/components/Layout";
import MonthContext from "@/context/MonthContext";
import { useChangeMonth } from "@/hooks/useChangeMonth";
import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { currentMonth, allDates, prevMonth, nextMonth } = useChangeMonth();
  return (
    <ThemeProvider theme={theme}>
      <MonthContext.Provider
        value={{ currentMonth, allDates, prevMonth, nextMonth }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MonthContext.Provider>
    </ThemeProvider>
  );
}
