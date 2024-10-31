import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Hero = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
            setCharacter(data);
        };
        fetchCharacter();
    }, [id]);

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
