import { useChangeMonth } from "@/hooks/useChangeMonth";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export const RenderDays = ({ allDates }) => {
  const arrayOfDays = allDates;

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ flex: "1 1 0%" }}>
      {(arrayOfDays || []).map((week, index) => (
        <Box
          display="flex"
          sx={{ flex: "1 1 0%", borderBottom: "var(--hairline) 1px solid" }}
          key={`week ${index}`}
        >
          {week.dates.map(({ day, month, isCurrentMonth, isCurrentDay }) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
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
                  fontWeight: "500px",
                  mt: 1,
                  color: isCurrentMonth
                    ? "var(--on-surface)"
                    : "var(--on-surface-variant-agm)",
                }}
              >
                {day} {day === 1 && dayjs(month).month(month).format("MMM")}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
