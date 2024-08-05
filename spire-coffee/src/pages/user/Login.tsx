import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { loginQuery } from "@/support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { ROUTES } from "@/config/routes";
import strings from "@/config/strings";
import useFormErrors from "@/component/helpers/useFormErrors";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors, resetErrors] = useFormErrors();

  const [login] = useLazyQuery(loginQuery, {
    onError: (error) => {
      console.error("Login error:", error);
      setLoginError("Failed to login. Please check your credentials and try again.");
    },
    onCompleted: (data) => {
      localStorage.setItem("authToken", data.login.token);
      console.log("User authenticated, logging in");
      navigate(ROUTES.ROOT);
    },
  });

  const handleLogin = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();

    setLoginError(""); // Clear previous errors
    resetErrors();

    let valid = true;

    if (!username) {
      setErrors(prevErrors => ({ ...prevErrors, username: strings.errorMsg.requiredField }));
      valid = false;
    }

    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: strings.errorMsg.requiredField }));
      valid = false;
    }

    if (!valid) {
      return;
    }

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
      <Container component="main" maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
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
          {loginError && <Alert severity="error">{loginError}</Alert>}
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
              error={!!errors.username}
              helperText={errors.username}
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
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              color="secondary"
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
                <Link to="#">{strings.login.forgotPassword}</Link>
              </Grid>
              <Grid item>
                <Link to={ROUTES.SIGN_UP}>{strings.login.signUpMsg}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
