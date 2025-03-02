import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and route detection
import { useEffect, useState } from 'react';

export default function ButtonAppBar() {
  const [userName, setUserName] = useState('HR-Portal');
  const navigate = useNavigate();
  const location = useLocation();  

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  
    localStorage.removeItem('email');  
    navigate('/');  
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
     
    if (email) {
      const name = email.substring(0, email.indexOf('@'));
      setUserName(name.charAt(0).toUpperCase() + name.slice(1)); 
    } else {
      setUserName('HR-Portal');
    }
  }, [location.pathname]);

  // Check if the current route is the Sign-In page
  const isSignInPage = location.pathname === '/';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#243f5a' }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {userName}
          </Typography>

          {/* Navigation Buttons */}
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/store')}>Store</Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About</Button>

          {/* Conditionally render Logout button */}
          {!isSignInPage && (
            <Button color="inherit" onClick={handleLogout}>LogOut</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}