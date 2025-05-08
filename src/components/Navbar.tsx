import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Akıllı Atık Yönetimi
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Ana Sayfa
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/map"
            startIcon={<MapIcon />}
          >
            Harita
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/dashboard"
            startIcon={<DashboardIcon />}
          >
            Panel
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/market"
            startIcon={<ShoppingCartIcon />}
          >
            Market
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            startIcon={<LoginIcon />}
          >
            Giriş Yap
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 