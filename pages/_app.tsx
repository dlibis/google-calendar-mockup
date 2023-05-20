import { EventModal } from "@/components/EventModal";
import Layout from "@/components/Layout";
import MonthContext from "@/context/MonthContext";
import { useChangeMonth } from "@/hooks/useChangeMonth";
import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showModal, setShowModal] = useState(false);
  const {
    currentMonth,
    allDates,
    prevMonth,
    nextMonth,
    handleSelectedDate,
    selectedDate,
  } = useChangeMonth();

  const handleShowModal = () => setShowModal((prev) => !prev);
  return (
    <ThemeProvider theme={theme}>
      <MonthContext.Provider
        value={{
          currentMonth,
          allDates,
          prevMonth,
          nextMonth,
          selectedDate,
          handleSelectedDate,
          showModal,
          handleShowModal,
        }}
      >
        <EventModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MonthContext.Provider>
    </ThemeProvider>
  );
}
