import MonthContext from "@/context/MonthContext";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import SquareIcon from "@mui/icons-material/Square";
import dayjs from "dayjs";

export const EditEvent = () => {
  const { selectedEvent } = useContext(MonthContext);
  return (
    <Box display={"flex"} sx={{ width: "100%" }}>
      <Box sx={{ paddingLeft: "28px" }}>
        <Box
          display={"flex"}
          sx={{ alignItems: "center", maxHeight: "36px", width: "40px" }}
        >
          <Box
            sx={{
              backgroundColor: "rgb(121, 134, 203)",
              borderRadius: "4px",
              height: "14px",
              width: "14px",
            }}
          ></Box>
        </Box>
      </Box>
      <Box sx={{ flex: "1 1 0%", paddingTop: "6px", paddingBottom: "6px" }}>
        <Typography sx={{ fontSize: "22px" }}>
          {selectedEvent?.title}
        </Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
          {dayjs(selectedEvent.date).format("dddd, DD MMM")}
        </Typography>
      </Box>
    </Box>
  );
};
