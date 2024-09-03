import Form from "@/component/Form";
import useFormErrors from "@/component/helpers/useFormErrors";
import Logo from "@/component/Logo";
import { LoginFormItems } from "@/config/FormItems";
import { ROUTES } from "@/config/routes";
import strings from "@/config/strings";
import { useAuth } from "@/context/AuthContext";
import { loginQuery } from "@/support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link as MuiLink,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
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
          paddingBottom: { xs: "50px", sm: "50px" },
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
          <Logo type="logo" />
          <Typography component="h1" variant="h5">
            {strings.login.signIn}
          </Typography>
          <Box sx={{ pt: 2 }}>
            {loginError && <Alert severity="error">{loginError}</Alert>}
          </Box>
          <Form
            fields={LoginFormItems}
            values={{ username, password }}
            errors={errors}
            onClick={handleLogin}
            onChange={handleChange}
            buttonLabel={strings.login.signIn}
          />
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
      </Container>
    </React.Fragment>
  );
};

export default Login;
