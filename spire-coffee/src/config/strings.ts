import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    general: {
      title: "Spire Coffee",
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
    navbar: {
      home: "Home",
      explore: "Explore",
      favourites: "Favourites",
      addCafe: "Add a Cafe",
      account: "Account",
      signOut: "Sign Out"
    },
    errorMsg: {
      requiredField: "This field is required",
      passwordMatch: "Passwords do not match",
      emailInvalid: "Invalid email address",
    }
  },
});

export default strings;
