import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { isAuthTokenExpired } from "../../common/utils/authUtil";
import { login } from "../state/slices/authSlice";
import ROUTES from "../../common/constants/routeConstants";

const theme = createTheme();

const Login = () => {
  isAuthTokenExpired().then((res) => {
    if (!res) {
      window.location.href = ROUTES.HOME;
    }
  });
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { isLoggedIn, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("username") === "") {
      setUsernameError(true);
      return;
    }
    if (data.get("password") === "") {
      setPasswordError(true);
      return;
    }
    dispatch(
      login({
        username: data.get("username"),
        password: data.get("password"),
      })
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = ROUTES.HOME;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (status === "pending" || status === "fulfilled") {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (status === "rejected") {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  }, [status]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            To-do App Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              error={usernameError}
              helperText={usernameError ? "Username is required" : ""}
              onChange={() => setUsernameError(false)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={passwordError}
              helperText={passwordError ? "Password is required" : ""}
              onChange={() => setPasswordError(false)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
          {loginError ? (
            <Typography component="subtitle1" color="error">
              Username or password is incorrect
            </Typography>
          ) : null}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
