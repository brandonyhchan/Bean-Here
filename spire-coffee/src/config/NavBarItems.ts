import { ROUTES } from "@/config/routes";
import strings from "@/config/strings";

export const NavbarItems = [
  {
    label: strings.Navbar.explore,
    path: ROUTES.EXPLORE,
  },
  { 
    label: strings.Navbar.favourites, 
    path: ROUTES.FAVOURITES
  },
  { 
    label: strings.Navbar.addCafe, 
    path: ROUTES.ADD_CAFE
  },
  { 
    label: strings.Navbar.account, 
    path: ROUTES.ACCOUNT
  },
  { 
    label: strings.Navbar.signOut, 
    path: ROUTES.SIGN_OUT 
  }
];
