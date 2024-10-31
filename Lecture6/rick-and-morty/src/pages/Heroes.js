import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography } from '@mui/material';

const Heroes = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25); 
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

  
    const fetchCharacters = async () => {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page + 1}`);
        const data = await response.json();
        setTotalCount(data.info.count);
        setCharacters(data.results); 
        setLoading(false);
    };

    useEffect(() => {
        fetchCharacters();
    }, [page, pageSize]); 

    const handleRowClick = (params) => {
        navigate(`/heroes/${params.id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

   
    const paginatedCharacters = characters.slice(page * pageSize, page * pageSize + pageSize);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ height: 500, width: '100%' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Character List
            </Typography>
            <DataGrid
                rows={paginatedCharacters}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[10, 25, 50]}
                pagination
                rowCount={totalCount}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => {
                    setPageSize(newPageSize); 
                    setPage(0); 
                }}
                onRowClick={handleRowClick}
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            />
        </div>
    );
};

export default Heroes;
