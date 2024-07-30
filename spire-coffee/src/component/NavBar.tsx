import * as React from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getNavBarIcons, NavBarItems } from "./data/NavBarItems";
import strings from "@/config/strings";
import "../index.css";

const NavBar = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const drawer = (
    <Box sx={{ width: 250, textAlign: 'center' }} role="presentation" onClick={handleDrawerToggle}>
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {strings.general.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {NavBarItems.map(({ label, path }) => (
                <Button
                  key={label}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none', fontSize: '1.2rem' }}
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box'},
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default NavBar;
