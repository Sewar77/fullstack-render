import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import DataTable from "../../AdminComponents/DataTable";
import { useCategories } from "../../../../Hooks/useCategories";
import AddButtun from "../../AdminComponents/AddButtun";
export default function ManageCategories() {
  const { categories, loading } = useCategories();

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h1">Manage Categories</Typography>
        <AddButtun data={"Category"} />
        <Divider sx={{ p: 2 }} />
        {loading ? (
          <Box>
            <Typography>Loading CATEGORIES</Typography>
            <LinearProgress />
          </Box>
        ) : (
          <DataTable data={categories} />
        )}
      </Box>
    </>
  );
}
