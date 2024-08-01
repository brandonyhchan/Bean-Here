import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import strings from "@/config/strings";
import { useLazyQuery } from "@apollo/client";
import { signUpMutation } from "@/support/graphqlServerApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Alert,
  Typography,
  Container,
  Box,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";

const SignUp = () => {
  const { setAuthStatus } = useAuth();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [signUp] = useLazyQuery(signUpMutation, {
    onError: (error) => {
      console.error("Signup error: ", error);
      setError("Failed to signup. Please try again.");
    },
    onCompleted: async (data) => {
      try {
        const token = data.signUp.token;
        if (token) {
          localStorage.setItem("authToken", token);
          console.log("New user successfully created");
          setAuthStatus(true);
          navigate("/");
        } else {
          throw new Error("Token not received");
        }
      } catch (err) {
        console.error("Error handling sign-up completion: ", err);
        setError("An error occurred during sign-up. Please try again.");
      }
    },
  });

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    signUp({
      variables: {
        userName: username,
        email,
        firstName,
        lastName,
        password,
      },
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.signUp} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            {strings.login.signUp}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSignUp}>
            <TextField
              required
              margin="normal"
              id="username"
              fullWidth
              name="username"
              label={strings.general.username}
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              required
              autoComplete="email"
              margin="normal"
              id="email"
              fullWidth
              name="email"
              label={strings.general.email}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              required
              autoComplete="name"
              margin="normal"
              id="firstName"
              fullWidth
              name="firstName"
              label={strings.general.firstName}
              value={firstName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFirstName(event.target.value);
              }}
            />
            <TextField
              required
              autoComplete="family-name"
              margin="normal"
              id="lastName"
              fullWidth
              name="lastName"
              label={strings.general.lastName}
              value={lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLastName(event.target.value);
              }}
            />
            <TextField
              required
              margin="normal"
              type="password"
              id="password"
              fullWidth
              name="password"
              label={strings.general.password}
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              required
              margin="normal"
              type="password"
              id="confirmPassword"
              fullWidth
              name="confirmPassword"
              label={strings.login.confirmPassword}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              color="secondary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!passwordError}
            >
              {strings.login.signUp}
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
