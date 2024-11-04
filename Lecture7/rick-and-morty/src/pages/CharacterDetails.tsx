import React from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchCharacterById, Character } from '../api/charactersApi';
import { CircularProgress, Typography } from '@mui/material';

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
        <div>
            <Typography variant="h4">{character.name}</Typography>
            <img src={character.image} alt={character.name} />
            <Typography>Status: {character.status}</Typography>
        </div>
    );
};

export default CharacterDetails;
