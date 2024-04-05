"use client";
import { Avatar, Box, Button } from "@mui/material";

export default function AvatarSection({
  avatarPreview,
  handleAvatarChange,
  fileInputRef,
  isEditAvatar,
  submitAvatar,
  theme
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 2
      }}>
      <Avatar src={avatarPreview} sx={{ width: 180, height: 180 }} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        name="image"
        style={{ display: "none" }}
        accept="image/png, image/jpeg, image/jpg"
      />
      {isEditAvatar ? (
        <Button
          onClick={submitAvatar}
          type="submit"
          variant="contained"
          color="secondary"
          component="span"
          sx={{
            "letterSpacing": "0.1em",
            "mt": 2,
            "width": "50%",
            "&:hover": {
              backgroundColor: theme.palette.accent.main
            }
          }}>
          Save Photo
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => fileInputRef.current.click()}
          variant="contained"
          color="secondary"
          component="span"
          sx={{ mt: 2, width: "50%" }}>
          Edit Photo
        </Button>
      )}
      <Button
        variant="contained"
        color="secondary"
        sx={{
          "letterSpacing": "0.1em",
          "mt": 2,
          "width": "50%",
          "&:hover": {
            backgroundColor: theme.palette.accent.main
          }
        }}>
        Add Card to Sell
      </Button>
    </Box>
  );
}
