import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Shared/Sidebar/Sidebar";
export default function AdminLayout() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-center",
          // gap: 3,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 2 }}>
          {/* sidebar */}
          <Sidebar />
        </Box>
        <Box sx={{ flex: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
