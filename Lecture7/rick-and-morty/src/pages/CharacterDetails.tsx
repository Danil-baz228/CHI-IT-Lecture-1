import React from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchCharacterById, Character } from '../api/charactersApi';
import { CircularProgress, Typography, Box, Paper, Avatar } from '@mui/material';

const CharacterDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useRequest(() => fetchCharacterById(Number(id)));

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load character details.</Typography>;

    const character: Character | undefined = data;

    if (!character) {
        return <Typography color="error">Character not found.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={character.image} alt={character.name} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4" sx={{ marginTop: 2 }}>{character.name}</Typography>
                <Typography>Status: {character.status}</Typography>
                <Typography>Species: {character.species}</Typography>
                <Typography>Gender: {character.gender}</Typography>
                <Typography>Origin: {character.origin.name}</Typography>
                <Typography>Location: {character.location.name}</Typography>
            </Box>
        </Paper>
    );
};

export default CharacterDetails;
