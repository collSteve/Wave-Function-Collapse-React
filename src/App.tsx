import React from 'react';
import './App.css';

import { Outlet, Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

class App extends React.Component {

  render() {
    const pages: {linkName:string, route:string}[] = [
      // {linkName: "Home", route:"/"},
      // {linkName: "Soduku", route:"/sudoku"},
      {linkName: "2D WFC", route:"/WFC-tile-2d"},
      {linkName: "raw tile 2D WFC", route:"/WFC-raw-tile-2d"},
    ];
    return (
      <div className="App">
        

      <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>{}}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={false}
                    onClose={()=>{}}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem component={RouterLink} key={page.linkName} to={page.route} onClick={()=>{}}>
                        <Typography textAlign="center">{page.linkName}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      component={RouterLink}
                      key={page.linkName}
                      to={page.route}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.linkName}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

        <Outlet></Outlet>
      </div>
    );
  }
}

export default App;
