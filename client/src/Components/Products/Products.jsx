import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import DataCard from "../Card/DataCard";
import { useCategories } from "../../Hooks/useCategories";
import { useProducts } from "../../Hooks/useProducts";
import { LoaderIcon } from "react-hot-toast";
export default function Products() {
  const { products, addProduct, loading } = useProducts();
  console.log("pro", products);

  return (
    <>
      <Box sx={{ my: 3 }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <DataCard type={"Products"} data={products} />
        )}
      </Box>
    </>
  );
}
