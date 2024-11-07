import React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { CircularProgress, Typography, Box, Paper } from '@mui/material';
import { useRequest } from 'ahooks';
import { fetchCharacters, Character } from '../api/charactersApi';
import CharacterDetails from './CharacterDetails';

const Heroes = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useRequest(fetchCharacters);

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/heroes/${params.id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load characters.</Typography>;

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flex: 1, padding: 2 }}> 
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={data?.results || []}
                            columns={columns}
                            onRowClick={handleRowClick}
                            autoHeight
                        />
                    </div>
                
            </Box>

            <Box sx={{ flex: 1, padding: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Heroes;
