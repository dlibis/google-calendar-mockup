import MonthContext from "@/context/MonthContext";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { RenderWeekDays } from "@/components/RenderWeekDays";
import dayjs from "dayjs";

export const MiniCalendar = () => {
  const { currentMonth, prevMonth, nextMonth, allDates } =
    useContext(MonthContext);
  return (
    <Box sx={{ padding: "0 14px 16px 19px" }}>
      <Box display={"flex"} alignItems={"center"} sx={{ ml: 0.52 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ color: "var(--on-surface)" }}>
            {currentMonth.format("MMMM YYYY")}
          </Typography>
        </Box>
        <Box display={"flex"}>
          <IconButton onClick={prevMonth}>
            <ChevronLeftIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <IconButton onClick={nextMonth}>
            <ChevronRightIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          ".weekDay": { fontSize: "10px" },
          "&>*>div": { borderRight: "unset" },
        }}
      >
        <RenderWeekDays format={"dd"} />
        <Box>
          {(allDates || []).map((week, index) => (
            <Box display="flex" sx={{ flex: "1 1 0%" }} key={`week ${index}`}>
              {week.dates.map(
                ({ day, month, isCurrentMonth, isCurrentDay }) => (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    sx={{
                      flex: "1 1 0%",
                      textAlign: "center",
                    }}
                    key={day}
                  >
                    <Typography
                      className={
                        isCurrentDay ? "todayClass todayClassMini" : ""
                      }
                      sx={{
                        fontSize: "10px",
                        fontWeight: "500",
                        letterSpacing: ".3px",
                        lineHeight: "16px",
                        mt: 1,
                        color: isCurrentMonth
                          ? "var(--on-surface)"
                          : "var(--on-surface-variant-agm)",
                      }}
                    >
                      {day}
                    </Typography>
                  </Box>
                )
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
