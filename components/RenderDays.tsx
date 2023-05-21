import MonthContext from "@/context/MonthContext";
import { useChangeMonth } from "@/hooks/useChangeMonth";
import instance from "@/utils/axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dayjs from "dayjs";
import { GetStaticProps } from "next/types";
import { useContext, useEffect, useState } from "react";

export const RenderDays = () => {
  const [events, setEvents] = useState([]);
  const {
    allDates,
    handleSelectedDate,
    handleShowModal,
    newEvent,
    handleNewEvent,
  } = useContext(MonthContext);

  const getEventTitle = (dayjsDate) => {
    return events.find((el) => el.eventDay === dayjsDate.format("DD MM"))
      ?.title;
  };

  useEffect(() => {
    instance.get("/events").then(({ data }) => {
      const parsedDateData = data.map((el) => ({
        ...el,
        eventDay: dayjs(el.date).format("DD MM"),
      }));
      setEvents(parsedDateData);
    });
    handleNewEvent(false);
  }, [newEvent]);

  console.log(events);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ flex: "1 1 0%" }}>
      {(allDates || []).map((week, index) => (
        <Box
          display="flex"
          sx={{ flex: "1 1 0%", borderBottom: "var(--hairline) 1px solid" }}
          key={`week ${index}`}
        >
          {week.dates.map(
            ({ day, dayjsDate, month, isCurrentMonth, isCurrentDay }) => (
              <Box
                onClick={() => {
                  handleSelectedDate(dayjsDate);
                  handleShowModal();
                }}
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  flex: "1 1 0%",
                  borderRight: "var(--hairline) 1px solid",
                  textAlign: "center",
                  "&:last-child": { borderRight: "none" },
                }}
                key={day}
              >
                <Typography
                  className={isCurrentDay ? "todayClass" : ""}
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    letterSpacing: ".3px",
                    lineHeight: "16px",
                    mt: 1,
                    color: isCurrentMonth
                      ? "var(--on-surface)"
                      : "var(--on-surface-variant-agm)",
                  }}
                >
                  {dayjsDate.format("D")}{" "}
                  {day === 1 && dayjs(month).month(month).format("MMM")}
                </Typography>
                {getEventTitle(dayjsDate) && (
                  <Box pr={1} mt={0.5}>
                    <Box
                      sx={{
                        backgroundColor: "rgb(121, 134, 203)",
                        padding: "0 8px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "4px",
                        height: "22px",
                      }}
                    >
                      <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                        {getEventTitle(dayjsDate)}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            )
          )}
        </Box>
      ))}
    </Box>
  );
};
