import strings from "@/config/strings";
import { useAuth } from "@/context/AuthContext";
import mainTheme from "@/styles/mainTheme";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedNavbarItems, UnauthenticatedNavbarItems } from "../config/NavbarItems";
import { ROUTES } from "../config/routes";
import { ClickableIconButton } from "../styles/iconTheme";
import { getNavbarIcons } from "./icons/NavbarIcons";
import Logo from "./Logo";

type NavbarPropsType = {
  isAuthenticated: boolean; // If the user is authenticated
};

const Navbar = ({ isAuthenticated }: NavbarPropsType) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    if (path === ROUTES.SIGN_OUT) {
      logout();
    } else {
      navigate(path);
    }
  };

  const drawer = (
    <Box
      sx={{ width: 250, textAlign: "center" }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <List>
        {isAuthenticated
          ? AuthenticatedNavbarItems.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => handleNavigation(path)}>
                <ListItemIcon>{getNavbarIcons(label)}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))
          : UnauthenticatedNavbarItems.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => handleNavigation(path)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="static"
        component="nav"
        sx={{ backgroundColor: mainTheme.palette.secondary.main }}
      >
        <Toolbar>
          <ClickableIconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "block", sm: "block", md: "none" }, // Display on xs and sm, hide on md and above
              color: "white",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <MenuIcon />
          </ClickableIconButton>
          <Logo size="100px" type="" />
          <MuiLink
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "10px",
            }}
            component={Link}
            to={ROUTES.ROOT}
            variant="h3"
          >
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
              {strings.general.title}
            </Typography>
          </MuiLink>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "none", md: "flex" } }}>
              {isAuthenticated
                ? AuthenticatedNavbarItems.map(({ label, path }) => (
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
                ))
                : UnauthenticatedNavbarItems.map(({ label, path }) => (
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
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
