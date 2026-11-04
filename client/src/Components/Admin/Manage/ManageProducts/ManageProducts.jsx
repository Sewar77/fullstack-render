import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import DataTable from "../../AdminComponents/DataTable";
import { useProducts } from "../../../../Hooks/useProducts";
import AddButtun from "../../AdminComponents/AddButtun";
export default function ManageProducts() {
  const { products, loading } = useProducts();

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h1">Manage Products</Typography>
        <AddButtun data={"Product"} />
        <Divider sx={{ p: 2 }} />
        {loading ? (
          <Box>
            <Typography>Loading Products</Typography>
            <LinearProgress />
          </Box>
        ) : (
          <DataTable data={products} />
        )}
      </Box>
    </>
  );
}
