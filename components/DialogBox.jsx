"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
//import { theme } from "@/styles/theme";

export default function ConfirmationDialog({ open, handleConfirm, handleCancel, message }) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" color="primary">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="accent">
          Cancel
        </Button>
        <Button onClick={handleConfirm} autoFocus color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
