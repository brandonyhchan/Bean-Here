import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import strings from "@/config/strings";
import "./navbar.css";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const items = ["Explore", "Favourites", "Add a Cafe", "Account", "Sign out"];

  const getIcon = (text: string) => {
    switch (text) {
      case "Explore":
        return <ExploreIcon />;
      case "Favourites":
        return <FavoriteIcon />;
      case "Add a Cafe":
        return <LocalCafeIcon />;
      case "Account":
        return <PersonIcon />;
      case "Sign out":
        return <LogoutIcon />;
      default:
        return null;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {items.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className="menuButton"
          >
            <MenuIcon onClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {strings.general.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
