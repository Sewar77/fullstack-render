import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
export default function AdminDashboard() {
  const { currentUser, authMe } = useAuth();

  return (
    <>
      <Box>
        <Typography>hello </Typography>
      </Box>
    </>
  );
}
