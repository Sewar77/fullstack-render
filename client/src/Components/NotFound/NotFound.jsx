import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container sx={{ my: "auto", p: 5 }}>
      <Paper elevation={4} sx={{ my: "auto", bgcolor: "error.main" }}>
        <Typography variant="h2">This Page Is Not Found</Typography>
        <Typography variant="h1">404</Typography>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Paper>
    </Container>
  );
}
