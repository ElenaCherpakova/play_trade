
'use client';
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import useAuthUser from "../store/useAuthUser";

const AuthControl = () => {
  const theme = useTheme();
  const { logout } = useAuthUser();
  const { data: session } = useSession();

  const handleLogin = async () => {
    // Handle login logic
  };

  const handleLogout = async () => {
    // Handle logout logic
  };

  return (
    <Box display="flex" alignItems="top">
      {session?.user?.email ? (
        <Typography sx={{ color: theme.palette.background.paper, marginRight: theme.spacing(2) }}>
          Hi, {session.user.name}!
        </Typography>
      ) : null}
      {session?.user?.email ? (
        <Button
          variant="contained"
          color="accent"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default AuthControl;
