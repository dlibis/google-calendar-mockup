// @ts-nocheck
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import Container from "@mui/material/Container";
import weekdayPlugin from "dayjs/plugin/weekday";
import { Box, Grid, Typography } from "@mui/material";
import { RenderWeekDays } from "@/components/RenderWeekDays";
import { RenderDays } from "@/components/RenderDays";
import { useChangeMonth } from "@/hooks/useChangeMonth";
dayjs.extend(weekdayPlugin);

export const MonthlyCalendar: React.FC = () => {
  const { allDates } = useChangeMonth();

  console.log("skldjsalkjdksa", allDates);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height="100%"
      sx={{ borderLeft: "var(--hairline) 1px solid" }}
    >
      <RenderWeekDays />
      <RenderDays allDates={allDates} />
    </Box>
  );
};
