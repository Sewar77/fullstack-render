import { useParams } from "react-router-dom";
import { useProducts } from "../../Hooks/useProducts";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import Header from "../Layout/Header";
export default function ProductsItem() {
  const { name, id } = useParams();
  const { loading, fetchAllProductsByCatId, productsCategory } = useProducts();
  useEffect(() => {
    fetchAllProductsByCatId(id);
  }, []);
  return (
    <>
      <Header />
      {productsCategory.map((p) => {
        return <Typography key={p.id}>{p.name}</Typography>;
      })}
    </>
  );
}
