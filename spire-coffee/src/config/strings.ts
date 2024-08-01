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
      errorMsg: {
        username: "Username is required",
        password: "Password is required"
      }
    },
    navbar: {
      home: "Home",
      explore: "Explore",
      favourites: "Favourites",
      addCafe: "Add a Cafe",
      account: "Account",
      signOut: "Sign Out"
    },
    path: {
      home: "/home",
      explore: "/explore",
      favourites: "/favourites",
      addCafe: "/addCafe",
      account: "/account",
      signOut: "/signOut",
      signUp: "/signUp"
    },
    footer: {
      copyright: "Copyright © 2023 SpireTech, Inc",
      email: "spiretechconsulting@gmail.com",
      about: "About",
      like: "Like us?",
      help: "Help us out",
      connect: "Let's Connect",
    },
    faq: {
      title: "FAQ Page",
      helmet: "FAQ",
    },
    aboutUs: {
      title: "About us page",
      helmet: "Who we are",
    },
  },
});

export default strings;
