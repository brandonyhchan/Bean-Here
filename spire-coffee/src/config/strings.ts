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
    },
    footer: {
      copyright: "Copyright © 2024 SpireTech, Inc",
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
    list: {
      busyness1: "Not too busy",
      busyness2: "Moderately busy",
      busyness3: "Very Busy",
      noisiness1: "Not too noisy",
      noisiness2: "Moderately noisy",
      noisiness3: "Very noisy",
      price1: "$",
      price2: "$$",
      price3: "$$$",
      priceText1: "Not too expensive",
      priceText2: "Moderately expensive",
      priceText3: "Very expensive",
      amenities1: "Has outlets",
      amenities2: "Has tables",
      amenities3: "Has outdoor seating",
    },
  },
});

export default strings;
