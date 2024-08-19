import useFormErrors from "@/component/helpers/useFormErrors";
import Logo from "@/component/Logo";
import { ROUTES } from "@/config/routes";
import strings from "@/config/strings";
import { useAuth } from "@/context/AuthContext";
import { loginQuery } from "@/support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors, resetErrors] = useFormErrors();

  const [loginAction] = useLazyQuery(loginQuery, {
    onError: (error) => {
      console.error("Login error:", error);
      setLoginError(
        "Failed to login. Please check your credentials and try again."
      );
    },
    onCompleted: (data) => {
      login(data.login.token);
    },
  });

  const handleLogin = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();

    setLoginError(""); // Clear previous errors
    resetErrors();

    let valid = true;

    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!valid) {
      return;
    }

    loginAction({
      variables: {
        userName: username,
        password: password,
      },
    });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.signIn} />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo />
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
                <Typography variant="body2">
                  <MuiLink variant="body2" component={Link} to={"#"}>
                    {strings.login.forgotPassword}
                  </MuiLink>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <MuiLink variant="body2" component={Link} to={ROUTES.SIGN_UP}>
                    {strings.login.signUpMsg}
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
