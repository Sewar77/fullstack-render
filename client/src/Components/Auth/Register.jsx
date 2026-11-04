import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const handleRegister = () => {
    console.log(userData);

    register(userData);
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
          <Typography variant="h1">Register</Typography>
          <Divider>Start Your Journy</Divider>
          <TextField
            label="First Name"
            value={userData.fname}
            onChange={(e) =>
              setUserData({ ...userData, fname: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            value={userData.lname}
            onChange={(e) =>
              setUserData({ ...userData, lname: e.target.value })
            }
          />
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
          <TextField
            label="Confirm Password"
            type="password"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          />
          <FormControl>
            <FormLabel>You Are</FormLabel>
            <RadioGroup
              defaultValue="user"
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              name="radio-buttons-group"
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="trader"
                control={<Radio />}
                label="Trader"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleRegister()}
          >
            Register
          </Button>
          <Typography variant="body2">
            You already have an account?
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
