"use client";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useAuthUser from "../store/useAuthUser";

const AuthControl = () => {
  const theme = useTheme();
  const { logout } = useAuthUser();
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/signin");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box display="flex" alignItems="top">
      {session?.user?.email ? (
        <Typography sx={{ color: theme.palette.background.paper, marginRight: theme.spacing(2) }}>
          Hi, {session.user.name}!
        </Typography>
      ) : null}
      {session?.user?.email ? (
        <Button variant="contained" color="accent" onClick={handleLogout} size="small">
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="accent" size="small" onClick={handleLogin}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default AuthControl;
