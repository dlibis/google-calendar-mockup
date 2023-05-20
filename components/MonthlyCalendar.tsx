import Box from "@mui/material/Box";
import { RenderWeekDays } from "@/components/RenderWeekDays";
import { RenderDays } from "@/components/RenderDays";

export const MonthlyCalendar: React.FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height="100%"
      sx={{ borderLeft: "var(--hairline) 1px solid" }}
    >
      <RenderWeekDays />
      <RenderDays />
    </Box>
  );
};
