import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useRequest } from 'ahooks';

const Hero = () => {
    const { id } = useParams();
    const { data: character, error, loading } = useRequest(`https://rickandmortyapi.com/api/character/${id}`);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading character.</Typography>;

    return (
        <Box sx={{ padding: 3, width: '300px', position: 'fixed', right: 0 }}>
            {character && (
                <>
                    <img src={character.image} alt={character.name} width="100%" />
                    <Typography variant="h6">{character.name}</Typography>
                    <Typography variant="body1">Status: {character.status}</Typography>
                </>
            )}
        </Box>
    );
};

export default Hero;
