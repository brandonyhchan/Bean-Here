import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export const NavBarItems = [
  {
    label: "Explore",
    path: "/explore"
  },
  { 
    label: "Favourites", 
    path: "/favourites" 
  },
  { 
    label: "Add a Cafe", 
    path: "/addCafe" 
  },
  { 
    label: "Account", 
    path: "/account" 
  },
  { 
    label: "Sign Out", 
    path: "/signOut" 
  }
];

export const getNavBarIcons = (text: string) => {
  switch (text) {
    case "Explore":
      return <ExploreIcon />;
    case "Favourites":
      return <FavoriteIcon />;
    case "Add a Cafe":
      return <LocalCafeIcon />;
    case "Account":
      return <PersonIcon />;
    case "Sign Out":
      return <LogoutIcon />;
    default:
      return null;
  }
};