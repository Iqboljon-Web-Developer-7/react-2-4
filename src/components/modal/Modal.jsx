import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

export default function UniModal({ title, open, setOpen, children }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{title}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>{children}</Box>
      </Modal>
    </div>
  );
}
