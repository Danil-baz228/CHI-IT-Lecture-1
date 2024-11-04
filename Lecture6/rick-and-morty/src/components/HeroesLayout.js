import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const HeroesLayout = () => {
    return (
        <Box sx={{ display: 'flex', padding: '20px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Character List
                </Typography>
                {/* Отображение списка персонажей */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default HeroesLayout;
