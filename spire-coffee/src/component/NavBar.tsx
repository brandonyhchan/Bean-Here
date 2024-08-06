import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavBarItems } from "../config/NavBarItems";
import { getNavBarIcons } from "./icons/NavBarIcons";
import { ClickableIconButton } from "../styles/iconTheme";
import strings from "@/config/strings";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const drawer = (
    <Box
      sx={{ width: 250, textAlign: "center" }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <List>
        {NavBarItems.map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton onClick={() => handleNavigation(path)}>
              <ListItemIcon>{getNavBarIcons(label)}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" component="nav">
        <Toolbar>
          <ClickableIconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "white",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <MenuIcon />
          </ClickableIconButton>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              {strings.general.title}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {NavBarItems.map(({ label, path }) => (
                <Button
                  key={label}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                  }}
                  onClick={() => handleNavigation(path)}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // for better open performance on mobile
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default NavBar;
