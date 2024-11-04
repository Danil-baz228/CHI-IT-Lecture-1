import axios from 'axios';

export interface Character {
    id: number;
    name: string;
    status: string;
    image: string;
}

export const fetchCharacters = async () => {
    try {
        const response = await axios.get<{ results: Character[] }>('https://rickandmortyapi.com/api/character');
        return response.data; 
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error; 
    }
};

export const fetchCharacterById = async (id: number) => {
    try {
        const response = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
        return response.data; 
    } catch (error) {
        console.error(`Error fetching character with id ${id}:`, error);
        throw error; 
    }
};
