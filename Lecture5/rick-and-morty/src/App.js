import React, { useEffect, useState } from 'react';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalCharacter, setModalCharacter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCharacters = async (page) => {
        if (loading) return;
        setLoading(true);

        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        setLoading(false);
    };

    const fetchCharacterById = async (id) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const character = await response.json();
        setModalCharacter(character);
    };

    const closeModal = () => {
        setModalCharacter(null);
    };

    const handleCharacterClick = (id) => {
        fetchCharacterById(id);
    };

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    const handleClickOutsideModal = (event) => {
        if (modalCharacter && event.target.id === 'modal') {
            closeModal();
        }
    };

    return (
        <div>
            <div id="characters">
                {characters.map((character) => (
                    <div key={character.id} data-id={character.id} onClick={() => handleCharacterClick(character.id)}>
                        <img src={character.image} alt={character.name} width="80" />
                        <div><strong>Name:</strong> {character.name}</div>
                        <div><strong>Status:</strong> {character.status}</div>
                    </div>
                ))}
            </div>

            {modalCharacter && (
                <div id="modal" onClick={handleClickOutsideModal} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div id="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '20px', borderRadius: '8px', position: 'relative' }}>
                        <button id="close-btn" onClick={closeModal}>Закрити</button>
                        <img id="modal-img" src={modalCharacter.image} alt={modalCharacter.name} width="100" />
                        <div id="modal-name">Name: {modalCharacter.name}</div>
                        <div id="modal-status">Status: {modalCharacter.status}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
