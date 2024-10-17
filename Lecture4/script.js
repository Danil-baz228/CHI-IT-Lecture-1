let currentPage = 1;
let loading = false;
const charactersDiv = document.getElementById('characters');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalStatus = document.getElementById('modal-status');
const closeButton = document.getElementById('close-btn');

function fetchCharacters(page) {
  if (loading) return;
  loading = true;

  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(response => response.json())
    .then(data => {
      displayCharacters(data.results);
      loading = false;
    });
}

function displayCharacters(characters) {
  charactersDiv.innerHTML += characters.map(character => `
    <div data-id="${character.id}">
      <img src="${character.image}" alt="${character.name}" width="80">
      <div><strong>Name:</strong> ${character.name}</div>
      <div><strong>Status:</strong> ${character.status}</div>
    </div>
  `).join('');
}

function fetchCharacterById(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.json())
    .then(character => {
      modalImg.src = character.image;
      modalName.textContent = `Name: ${character.name}`;
      modalStatus.textContent = `Status: ${character.status}`;
      modal.style.display = 'flex';
    });
}


charactersDiv.addEventListener('click', (event) => {
  const card = event.target.closest('[data-id]');
  if (!card) return;

  const characterId = card.getAttribute('data-id');
  fetchCharacterById(characterId);
  event.stopPropagation();
});


closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
    currentPage++;
    fetchCharacters(currentPage);
  }
});

fetchCharacters(currentPage);
