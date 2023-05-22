import MonthContext from "@/context/MonthContext";
import { Modal, Box, IconButton } from "@mui/material";
import { useContext, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CreateEvent } from "@/components/CreateEvent";
import { EditEvent } from "@/components/EditEvent";
import instance from "@/utils/axios";
import { toast } from "react-toastify";

export const EventModal = () => {
  const {
    showModal,
    handleShowModal,
    modalType,
    selectedEvent,
    handleNewEvent,
  } = useContext(MonthContext);

  const handleDeleteEvent = () => {
    const eventId = selectedEvent.id;
    toast.promise(
      instance.delete(`/events/${eventId}`),
      {
        pending: "Deleting...",
        success: "Event Deleted",
        error: "Error Happened",
      },
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
    <Modal open={showModal} onClose={handleShowModal} hideBackdrop>
      <Box className="innerModal">
        <Box display={"flex"} justifyContent={"end"} sx={{ height: "52px" }}>
          {modalType === "edit" && (
            <>
              <IconButton sx={{ fill: "rgb(95,99,104)" }}>
                {/* edit button */}
                <svg
                  focusable="false"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
                </svg>
              </IconButton>
              <IconButton
                sx={{ fill: "rgb(95,99,104)" }}
                onClick={handleDeleteEvent}
              >
                {/* delete button */}
                <svg
                  focusable="false"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                  <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                </svg>
              </IconButton>
            </>
          )}
          <IconButton onClick={() => handleShowModal(false)}>
            <CloseIcon sx={{ height: "20px", width: "20px" }} />
          </IconButton>
        </Box>
        {modalType === "create" ? (
          <CreateEvent
            handleNewEvent={handleNewEvent}
            handleShowModal={handleShowModal}
          />
        ) : (
          <EditEvent />
        )}
      </Box>
    </Modal>
  );
};
