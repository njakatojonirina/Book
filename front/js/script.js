let currentPage = 1;
const limit = 10;

async function fetchLivres(page = currentPage) {
    try {
        const response = await fetch(`/api/livre?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache', 
                'Pragma': 'no-cache',        
                'Expires': '0'             
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des livres');
        }

        const data = await response.json();
        currentPage = page;
        displayLivres(data);

        return data.totalPages; 
    } catch (error) {
        console.error(error);
    }
}


function displayLivres(data) {
    const livresContainer = document.getElementById('livres');
    livresContainer.innerHTML = '';

    const { livres, currentPage, totalPages } = data;

    livres.forEach(livre => {
        const livreRow = document.createElement('tr');
        const date = new Date(livre.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        livreRow.innerHTML = `
            <td>${livre.titre}</td>
            <td>${livre.auteur}</td>
            <td>${year}-${month}-${day}</td>
            <td><button onclick="showDetails('${livre._id}')">Détails</button></td>
        `;
        livresContainer.appendChild(livreRow);
    });

    updatePaginationControls(currentPage, totalPages);
}

function nextPage() {
    fetchLivres(currentPage + 1);
}

function prevPage() {
    if (currentPage > 1) {
        fetchLivres(currentPage - 1);
    }
}

function updatePaginationControls(currentPage, totalPages) {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = '';

    const pageDisplay = document.createElement('span');
    pageDisplay.innerText = `Page ${currentPage} / ${totalPages}`;
    pageDisplay.classList.add('page-display'); 
    paginationContainer.appendChild(pageDisplay);

    const prevButton = document.createElement('button');
    prevButton.id = 'prevButton';
    prevButton.innerText = '⏪';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = prevPage;
    paginationContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.id = 'nextButton';
    nextButton.innerText = '⏩';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = nextPage;
    paginationContainer.appendChild(nextButton);
}

async function ajouterLivre(event) {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const date = document.getElementById('date').value;
    const livreData = { titre, auteur, date };

    try {
        const response = await fetch('/api/livre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livreData)
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du livre");
        }

        document.getElementById('livreForm').reset();
        alert('ajout livre succes')
        // Aller à la dernière page après l'ajout d'un nouveau livre
        const totalPages = await fetchLivres();
        fetchLivres(totalPages);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('livreForm').addEventListener('submit', ajouterLivre);
document.addEventListener('DOMContentLoaded', () => {
    fetchLivres();
});



async function showDetails(id) {
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modalDetails');
    try {
        const response = await fetch(`/api/livre/${id}`);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails du livre');
        }

        const livre = await response.json();
        modalDetails.innerHTML = `
            <strong>Titre:</strong> ${livre.titre}<br>
            <strong>Auteur:</strong> ${livre.auteur}<br>
            <strong>Date:</strong> ${livre.date}
        `;
    } catch (error) {
        console.error(error);
    }
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.getElementById('closeModal').addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});