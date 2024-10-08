import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    general: {
      title: "Bean Here?",
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
      signOut: "Sign Out",
      login: "Sign In",
      signUp: "Sign Up",
    },
    error: {
      requiredField: "This field is required",
      passwordMatch: "Passwords do not match",
      emailInvalid: "Invalid email address",
      passwordLength: "Password must have at least 5 characters",
      passwordSpecial: "Password must have at least 1 special character",
      passwordNum: "Password must have at least 1 number",
      passwordCap: "Password must have at least 1 capital",
      exploreGeneric: "There was an error retrieving cafes.",
      noCafe: "No cafes found!",
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
    cafe: {
      busynessLabel: "Capacity",
      noisinessLabel: "Noise",
      priceLabel: "Price",
      cafeInformation: "Cafe Information",
      reportText:
        "What is the current status of the cafe? Help us report it live!",
      reportButton: "Report Status",
      submitReportButton: "Submit",
      cancelReportButton: "Cancel",
      businessHours: "Business Hours",
      noWebsite: "Website unavailable",
      noPhoneNumber: "Phone number unavailable",
      getDirections: "Get Directions",
      reportSubmitMessage: "Thank you! Your report has been submitted"
    },
    filter: {
      heading: "Filter",
      distance: "Distance (km)",
      capacity: "Current Capacity",
      noise: "Noise Level",
      price: "Price",
      clearFilters: "Clear Filters",
    },
    level: {
      low: "Low",
      medium: "Moderate",
      high: "High"
    },
    sort: {
      heading: "Sort by",
    },
  },
});

export default strings;
