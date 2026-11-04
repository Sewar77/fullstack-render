import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

export default function Unautherized() {
  const navigate = useNavigate();
  return (
    <Container>
      <Paper elevation={4}>
        <Typography variant="h2">You Are Not Allowsd this path</Typography>
        <Typography variant="h1">DANGER</Typography>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Paper>
    </Container>
  );
}
