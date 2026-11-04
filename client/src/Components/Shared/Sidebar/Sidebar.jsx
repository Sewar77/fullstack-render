import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAuth } from "../../../Hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { useThemeContext } from "../../../Hooks/useTheme";
export default function Sidebar() {
  const navigate = useNavigate();

  const { isDark } = useThemeContext();
  return (
    <>
      <Box
        sx={{
          bgcolor: "#4B3621",
          height: "100vh",
          position: "static",
          width: "300px",
          color: "white",
          fontSize: "25px",
          overflowY: "scroll",
        }}
      >
        <ThemeToggle />
        <List
          sx={{
            p: 2,
            m: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ListItemButton>Dashboard</ListItemButton>

          {"Admin" === "admin" && (
            <>
              <ListItemButton onClick={() => navigate("/admin/users")}>
                Users
              </ListItemButton>
              <ListItemButton>Messages</ListItemButton>
            </>
          )}

          <ListItemButton onClick={() => navigate("/admin/products")}>
            Products
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/admin/categories")}>
            Categories
          </ListItemButton>

          <ListItemButton>Profile</ListItemButton>
          <ListItemButton>Logout</ListItemButton>
        </List>
      </Box>
    </>
  );
}
