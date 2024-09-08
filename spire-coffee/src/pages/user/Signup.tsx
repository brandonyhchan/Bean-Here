import Form from "@/component/Form";
import useFormErrors from "@/component/helpers/useFormErrors";
import Logo from "@/component/Logo";
import { SignUpFormItems } from "@/config/FormItems";
import strings from "@/config/strings";
import { useAuth } from "@/context/AuthContext";
import { signUpMutation } from "@/support/graphqlServerApi";
import { useLazyQuery } from "@apollo/client";
import { Alert, Box, Container, CssBaseline, Typography } from "@mui/material";
import EmailValidator from "email-validator";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { setAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");
  const [errors, setErrors, resetErrors] = useFormErrors();
  const [passwordTyped, setPasswordTyped] = useState(false);
  const [values, setValues] = useState<SignUpFormValues>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

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

    if (!values.username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!values.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: strings.error.requiredField,
      }));
      valid = false;
    } else if (!EmailValidator.validate(values.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: strings.error.emailInvalid,
      }));
      valid = false;
    }

    if (!values.firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!values.lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!values.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.requiredField,
      }));
      valid = false;
    } if (values.password !== values.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.passwordMatch,
      }));
      valid = false;
    }

    if (!values.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: strings.error.requiredField,
      }));
      valid = false;
    }

    if (!valid) {
      return;
    }

    signUp({
      variables: {
        userName: values.username,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      },
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      password: event.target.value
    }));
    setPasswordTyped(true);

    if (event.target.value !== values.confirmPassword) {
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
    setValues((prev) => ({
      ...prev,
      confirmPassword: event.target.value
    }));
    if (event.target.value !== values.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: strings.error.passwordMatch,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      handlePasswordChange(event);
    } else if (name === "confirmPassword") {
      handleConfirmPasswordChange(event);
    }
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.signUp} />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} style={{ paddingTop: "25px", paddingBottom: "25px" }}>
          <Logo type="logo" />
          <Typography component="h1" variant="h5">{strings.login.signUp}</Typography>
          <Box sx={{ pt: 2 }}>
            {signUpError && <Alert severity="error">{signUpError}</Alert>}
          </Box>
          {passwordTyped && (
            <Box sx={{ pt: 2 }}>
              <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital"]}
                minLength={5}
                value={values.password}
                valueAgain={values.confirmPassword}
                messages={{
                  minLength: strings.error.passwordLength,
                  specialChar: strings.error.passwordSpecial,
                  number: strings.error.passwordNum,
                  capital: strings.error.passwordCap
                }}
              />
            </Box>
          )}
          <Form
            fields={SignUpFormItems}
            values={{ ...values }}
            errors={errors}
            onSubmit={handleSignUp}
            onChange={handleChange}
            buttonLabel={strings.login.signIn}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
