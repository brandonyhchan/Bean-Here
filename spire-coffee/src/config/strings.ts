import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    general: {
      title: "SpireCoffee",
      email: "Email Address",
      username: "Username",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
    },
    login: {
      signIn: "Sign In",
      forgotPassword: "Forgot password?",
      signUpMsg: "Don't have an account? Sign Up",
      signUp: "Sign Up",
      confirmPassword: "Confirm Password",
    },
  },
});

export default strings;
