import MonthContext from "@/context/MonthContext";
import instance from "@/utils/axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const CreateEvent = ({ handleNewEvent, handleShowModal }) => {
  const { selectedDate } = useContext(MonthContext);
  const inputRef = useRef<HTMLInputElement>();

  const handleCreateEvent = () => {
    toast.promise(
      instance.post("/events", {
        title: inputRef.current!.value,
        date: selectedDate.format(),
      }),
      { pending: "Saving...", success: "Event Saved", error: "Error happened" },
      {
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
      }
    );
    handleShowModal(false);
    handleNewEvent(true);
  };
  return (
    <>
      <Box sx={{ "&>*": { paddingLeft: "52px" } }}>
        <Box pt={1} mr={2}>
          <TextField
            label="Add title and time"
            variant="standard"
            fullWidth
            sx={{ ".MuiInputLabel-root": { fontSize: "22px" } }}
            inputRef={inputRef}
          />
        </Box>
        <Box display={"flex"} mt={2}>
          <Button
            variant="text"
            sx={{
              backgroundColor: "var(--secondary-variant)",
              color: "var(--on-secondary)",
            }}
          >
            Event
          </Button>
          <Button disabled>Task</Button>
        </Box>
      </Box>
      <Box
        display={"flex"}
        sx={{ margin: "16px 16px 0" }}
        alignItems={"center"}
      >
        <Box pr={1}>
          <AccessTimeIcon
            sx={{
              fontSize: "20px",
              color: "var(--on-surface-variant)",
              fill: "var(--on-surface-variant)",
            }}
          />
        </Box>
        <Box>
          <Typography>
            {selectedDate && selectedDate.format("dddd, DD MMM")} -{" "}
            {selectedDate && selectedDate.format("dddd, DD MMM")}
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"end"} p={2}>
        <Button variant="contained" onClick={handleCreateEvent}>
          Save
        </Button>
      </Box>
    </>
  );
};
