import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

function Navbar() {
    const [isClient, setIsClient] = useState(false);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsClient(true); // Убедитесь, что компонент рендерится только на клиенте
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isClient) {
        return null; // Пока клиент не загрузился, не рендерим ничего
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Link href="/" passHref>
                    <Button color="inherit">Home</Button>
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link href="/my-posts" passHref>
                            <Button color="inherit">My Posts</Button>
                        </Link>
                        <Link href="/new-post" passHref>
                            <Button color="inherit">Create Post</Button>
                        </Link>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Link href="/login" passHref>
                            <Button color="inherit">Login</Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button color="inherit">Register</Button>
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
