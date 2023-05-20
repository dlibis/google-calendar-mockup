import { getWeekDays } from "@/utils/utils";
import { Box, Typography } from "@mui/material";

export const RenderWeekDays = () => {
  const weekdays = getWeekDays();

  return (
    <Box display={"flex"} sx={{ height: "20px", alignItems: "strech" }}>
      {weekdays.map((weekday) => (
        <Box
          sx={{
            flex: "1 1 0%",
            borderRight: "var(--hairline) 1px solid",
            textAlign: "center",

            "&:last-child": { borderRight: "none" },
          }}
          key={weekday}
        >
          <Typography
            sx={{
              color: "var(--on-surface-variant-agm)",
              fontSize: "11px",
              fontWeight: "500px",
              lineHeight: "20px",
              textTransform: "uppercase",
            }}
          >
            {weekday}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
