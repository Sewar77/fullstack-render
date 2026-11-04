import {
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    login(userData);
  };
  return (
    <>
      <Container sx={{ margin: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Typography variant="h1">Login</Typography>
          <Divider>Continue Your Journy</Divider>
          <TextField
            label="Email"
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
          <Typography variant="body2">
            Don`t have an account?
            <Button
              variant="contained"
              color="primary"
              // onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
