import { EventModal } from "@/components/EventModal";
import Layout from "@/components/Layout";
import MonthContext from "@/context/MonthContext";
import { useChangeMonth } from "@/hooks/useChangeMonth";
import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const {
    currentMonth,
    allDates,
    prevMonth,
    nextMonth,
    handleSelectedDate,
    selectedDate,
  } = useChangeMonth();

  const handleShowModal = (value: boolean) => setShowModal(value);

  const handleNewEvent = (value: boolean) => setNewEvent(value);

  const handleSetModalType = (value: "create" | "edit") => setModalType(value);

  const handleSelectedEvent = (value) => setSelectedEvent(value);

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
          handleNewEvent,
          newEvent,
          modalType,
          handleSetModalType,
          handleSelectedEvent,
          selectedEvent,
        }}
      >
        <ToastContainer />
        <EventModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MonthContext.Provider>
    </ThemeProvider>
  );
}
