import MonthContext from "@/context/MonthContext";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const EventModal = () => {
  const { showModal, handleShowModal, selectedDate } = useContext(MonthContext);
  return (
    <Modal open={showModal} onClose={handleShowModal} hideBackdrop>
      <Box className="innerModal">
        <Box display={"flex"} justifyContent={"end"}>
          <IconButton onClick={handleShowModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ "&>*": { paddingLeft: "52px" } }}>
          <Box pt={1} mr={2}>
            <TextField
              label="Add title and time"
              variant="standard"
              fullWidth
              sx={{ ".MuiInputLabel-root": { fontSize: "22px" } }}
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
          <Button variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};
