import { getWeekDays } from "@/utils/utils";
import { Box, Typography } from "@mui/material";

type Props = { format?: string };

export const RenderWeekDays: React.FC<Props> = ({ format }) => {
  const weekdays = getWeekDays(format);

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
            className="weekDay"
            sx={{
              color: "var(--on-surface-variant-agm)",
              fontSize: "11px",
              fontWeight: "500",
              lineHeight: "20px",
              textTransform: "uppercase",
            }}
          >
            {format === "dd" ? weekday.slice(0, 1) : weekday}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
