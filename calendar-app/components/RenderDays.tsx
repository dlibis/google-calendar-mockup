import MonthContext from "@/context/MonthContext";
import { CalendarEvent } from "@/event";
import { useChangeMonth } from "@/hooks/useChangeMonth";
import instance from "@/utils/axios";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dayjs from "dayjs";
import { GetStaticProps } from "next/types";
import { useContext, useEffect, useState } from "react";

export const RenderDays = () => {
  const [events, setEvents] = useState<
    (CalendarEvent & { eventDay: string })[]
  >([]);
  const {
    allDates,
    handleSelectedDate,
    handleShowModal,
    newEvent,
    handleNewEvent,
    handleSetModalType,
    handleSelectedEvent,
  } = useContext(MonthContext);

  const getEvent = (dayjsDate: dayjs.Dayjs) => {
    return events.find((el) => el.eventDay === dayjsDate.format("DD MM"));
  };

  useEffect(() => {
    instance.get("/events").then(({ data }: { data: CalendarEvent[] }) => {
      const parsedDateData = data.map((el) => ({
        ...el,
        eventDay: dayjs(el.date).format("DD MM"),
      }));
      setEvents(parsedDateData);
    });
    handleNewEvent(false);
  }, [newEvent]);

  const todayClass = {
    marginTop: "3px",
    height: "24px",
    lineHeight: "24px",
    color: "#fff",
    backgroundColor: "var(--primary)",
    borderRadius: "50%",
    minWidth: "24px",
    width: "max-content",
  };

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
                  handleSetModalType("create");
                  handleShowModal(true);
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
                  // className={isCurrentDay ? "todayClass" : ""}
                  sx={[
                    {
                      alignSelf: "center",
                      fontSize: "12px",
                      fontWeight: "500",
                      letterSpacing: ".3px",
                      lineHeight: "16px",
                      mt: 1,
                      color: isCurrentMonth
                        ? "var(--on-surface)"
                        : "var(--on-surface-variant-agm)",
                    },
                    isCurrentDay && todayClass,
                  ]}
                >
                  {dayjsDate.format("D")}{" "}
                  {day === 1 && dayjs(month).month(month).format("MMM")}
                </Typography>
                {getEvent(dayjsDate) && (
                  <Box pr={1} mt={0.5}>
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: "rgb(121, 134, 203)",
                        padding: "0 8px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "4px",
                        height: "22px",
                        justifyContent: "start",
                      }}
                      onClick={(event) => {
                        handleSetModalType("edit");
                        handleShowModal(true);
                        handleSelectedEvent(getEvent(dayjsDate));
                        event.stopPropagation();
                      }}
                    >
                      <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                        {getEvent(dayjsDate)?.title}
                      </Typography>
                    </Button>
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
