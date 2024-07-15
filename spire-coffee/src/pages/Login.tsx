import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { loginQuery } from "@/support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import strings from "@/config/strings";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useLazyQuery(loginQuery, {
    onError: (error) => {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials and try again.");
    },
    onCompleted: (data) => {
      localStorage.setItem("authToken", data.login.token);
      console.log("User authenticated, logging in");
      navigate("/home");
    },
  });

  const handleLogin = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    login({
      variables: {
        userName: username,
        password: password,
      },
    });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.signIn} />
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
            {strings.login.signIn}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={strings.general.username}
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={strings.general.password}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              {strings.login.signIn}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {strings.login.forgotPassword}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {strings.login.signUpMsg}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </React.Fragment>
  );
};

export default Login;