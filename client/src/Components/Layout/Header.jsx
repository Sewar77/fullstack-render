import { Box, IconButton, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "../../Hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { logout } = useAuth();
  const currentUser = {};
  const navigate = useNavigate();
  return (
    <>
      <AppBar sx={{ p: 2, position: "static" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h1">Logo</Typography>
          <Box>
            <IconButton onClick={() => navigate("/products")}>
              Poducts
            </IconButton>
            <IconButton onClick={() => navigate("/categories")}>
              Categories
            </IconButton>
            {currentUser && Object.keys(currentUser).length > 0 ? (
              <>
                <IconButton onClick={() => navigate("/cart")}>Cart</IconButton>
                <IconButton>Profile</IconButton>
                <IconButton onClick={() => logout()}>Logout</IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => navigate("/register")}>
                  Register
                </IconButton>
                <IconButton onClick={() => navigate("/login")}>
                  Login
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
