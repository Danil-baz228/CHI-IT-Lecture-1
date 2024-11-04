import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Switch, AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = ({ setDarkMode, darkMode }) => {
    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Rick and Morty App
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/heroes">Heroes</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
