import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    general: {
      title: "SpireCoffee",
      email: "Email Address",
      username: "Username",
      password: "Password",
    },
    login: {
      signIn: "Sign In",
      forgotPassword: "Forgot password?",
      signUpMsg: "Don't have an account? Sign Up",
    },
  },
});

export default strings;
