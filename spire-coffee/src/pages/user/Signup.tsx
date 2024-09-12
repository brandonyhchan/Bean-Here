import CustomButton from "@/component/CustomButton";
import useFormErrors from "@/component/helpers/useFormErrors";
import Logo from "@/component/Logo";
import strings from "@/config/strings";
import { useAuth } from "@/context/AuthContext";
import { signUpMutation } from "@/support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import EmailValidator from "email-validator";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { setAuthStatus } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTyped, setPasswordTyped] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [errors, setErrors, resetErrors] = useFormErrors();

  const [signUp] = useLazyQuery(signUpMutation, {
    onError: (error) => {
      console.error("Signup error: ", error);
      setSignUpError("Failed to signup. Please try again.");
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
        setSignUpError("An error occurred during sign-up. Please try again.");
      }
    },
  });

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSignUpError(""); // Clear previous errors
    resetErrors();

    let valid = true;

    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: strings.error.requiredField,
      }));
      valid = false;
    } else if (!EmailValidator.validate(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: strings.error.emailInvalid,
      }));
      valid = false;
    }

    if (!firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.requiredField,
      }));
      valid = false;
    } else if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.passwordMatch,
      }));
      valid = false;
    }

    if (!valid) {
      return;
    }

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
    setPasswordTyped(true); // Mark password as typed
    if (event.target.value !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.passwordMatch,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.passwordMatch,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.signUp} />
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
          style={{ paddingTop: "25px", paddingBottom: "25px" }}
        >
          <Logo type="logo" />
          <Typography component="h1" variant="h5">
            {strings.login.signUp}
          </Typography>
          {signUpError && <Alert severity="error">{signUpError}</Alert>}
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSignUp}>
            <TextField
              margin="normal"
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
              fullWidth
              id="email"
              label={strings.general.email}
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label={strings.general.firstName}
              name="firstName"
              autoComplete="firstName"
              value={firstName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFirstName(event.target.value);
              }}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label={strings.general.lastName}
              name="lastName"
              autoComplete="lastName"
              value={lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLastName(event.target.value);
              }}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="password"
              label={strings.general.password}
              name="password"
              autoComplete="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            {passwordTyped && (
              <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital"]}
                minLength={5}
                value={password}
                valueAgain={confirmPassword}
                messages={{
                  minLength: strings.error.passwordLength,
                  specialChar: strings.error.passwordSpecial,
                  number: strings.error.passwordNum,
                  capital: strings.error.passwordCap
                }}
              />
            )}
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="confirmPassword"
              label={strings.login.confirmPassword}
              name="confirmPassword"
              autoComplete="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <CustomButton
              color="secondary"
              fullWidth
              variant="contained"
              text={strings.login.signUp}
              style={{ marginTop: "24px", marginBottom: "16px" }}
              type="submit"
            />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
