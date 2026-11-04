import { Typography } from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import { useEffect } from "react";
import Header from "../../Components/Layout/Header";
export default function Home() {
  return (
    <>
      <Header />
      <Typography variant="h3">you logged in successfully!</Typography>
    </>
  );
}
