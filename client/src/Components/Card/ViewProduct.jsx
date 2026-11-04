import { useParams } from "react-router-dom";
import { useProducts } from "../../Hooks/useProducts";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import Header from "../Layout/Header";
export default function ViewProduct() {
  const { name, id } = useParams();
  const { loading, fetchAllProductsById, product } = useProducts();
  useEffect(() => {
    fetchAllProductsById(id);
  }, []);
  return (
    <>
      <Header />
      <Typography>{product.name}</Typography>
      <Typography>{product.price}</Typography>
    </>
  );
}
