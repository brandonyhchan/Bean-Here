import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { ROUTES } from "@/config/routes";
import strings from "@/config/strings";

export const NavBarItems = [
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

export const getNavBarIcons = (text: string) => {
  switch (text) {
    case strings.navbar.explore:
      return <ExploreIcon />;
    case strings.navbar.favourites:
      return <FavoriteIcon />;
    case strings.navbar.addCafe:
      return <LocalCafeIcon />;
    case strings.navbar.account:
      return <PersonIcon />;
    case strings.navbar.signOut:
      return <LogoutIcon />;
    default:
      return null;
  }
};
