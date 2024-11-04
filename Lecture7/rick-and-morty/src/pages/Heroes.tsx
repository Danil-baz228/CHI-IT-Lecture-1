// src/pages/Heroes.tsx
import React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import { fetchCharacters, Character } from '../api/charactersApi';

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
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={data?.results || []} // Убедитесь, что results правильно доступны
                columns={columns}
                
                onRowClick={handleRowClick}
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                }}
                autoHeight
            />
        </div>
    );
};

export default Heroes;
