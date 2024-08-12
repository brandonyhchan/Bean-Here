import { ROUTES } from "@/config/routes";
import strings from "@/config/strings";

export const NavbarItems = [
  {
    label: strings.navbar.explore,
    path: ROUTES.EXPLORE,
  },
  { 
    label: strings.navbar.favourites, 
    path: ROUTES.FAVOURITES
  },
  { 
    label: strings.navbar.addCafe, 
    path: ROUTES.ADD_CAFE
  },
  { 
    label: strings.navbar.account, 
    path: ROUTES.ACCOUNT
  },
  { 
    label: strings.navbar.signOut, 
    path: ROUTES.SIGN_OUT 
  }
];
