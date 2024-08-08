import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import strings from "../../config/strings";

export const getNavbarIcons = (text: string) => {
  switch (text) {
    case strings.Navbar.explore:
      return <ExploreIcon />;
    case strings.Navbar.favourites:
      return <FavoriteIcon />;
    case strings.Navbar.addCafe:
      return <LocalCafeIcon />;
    case strings.Navbar.account:
      return <PersonIcon />;
    case strings.Navbar.signOut:
      return <LogoutIcon />;
    default:
      return null;
  }
};
