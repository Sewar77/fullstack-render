import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useUsers } from "../../../../Hooks/useUsers";
import { useEffect } from "react";
import DataTable from "../../AdminComponents/DataTable";
import AddButtun from "../../AdminComponents/AddButtun";
export default function ManageUsers() {
  const { getAllUsers, users, loading } = useUsers();
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h1">Manage Users</Typography>
        <AddButtun data={"User"} />
        <Divider sx={{ p: 2 }} />
        {loading ? (
          <Box>
            <Typography>Loading Users</Typography>
            <LinearProgress />
          </Box>
        ) : (
          <DataTable data={users} />
        )}
      </Box>
    </>
  );
}
