import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import strings from "@/config/strings";

export const NavBarItems = [
  {
    label: strings.navbar.explore,
    path: strings.path.explore
  },
  { 
    label: strings.navbar.favourites, 
    path: strings.path.favourites
  },
  { 
    label: strings.navbar.addCafe, 
    path: strings.path.addCafe
  },
  { 
    label: strings.navbar.account, 
    path: strings.path.account
  },
  { 
    label: strings.navbar.signOut, 
    path: strings.path.signOut
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
