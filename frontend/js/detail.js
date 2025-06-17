import { loadNavbar } from './navbar.js';
import * as api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();

    // Pour récupérer l'ID d'un objet
    const params = new URLSearchParams(window.location.search);
    const idObjet = params.get('id');

    if (idObjet) {
        chargerObjetDetail(idObjet);
    }
});

async function chargerObjetDetail(id) {
    try {
        const objet = await api.getObjetById(id);
        afficherObjetDetail(objet);
    } catch (err) {
        console.error("Impossible de charger l'objet", err);
    }
}

function afficherObjetDetail(objet) {
    const container = document.getElementById('detail-container');
    container.innerHTML = `
        <div class="card">
            <img src="${objet.imageUrl}" alt="${objet.title}">
            <div class="card-content">
                <h3>${objet.title}</h3>
                <p>${objet.description}</p>
                <p class="price">${(objet.price / 100).toFixed(2)} €</p>
            </div>
            <div class="card-buttons">
                <button class="btn-edit">Modifier</button>
                <button class="btn-delete">Supprimer</button>
            </div>
        </div>
    `;

    // Sélectionne les boutons une fois insérés dans le DOM
    const btnEdit = container.querySelector('.btn-edit');
    const btnDelete = container.querySelector('.btn-delete');   

    // Événements
    btnEdit.addEventListener('click', () => {
        window.location.href = `ajout.html?id=${objet._id}`;
    });

    btnDelete.addEventListener('click', async () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet objet ?")) {
            try {
                await api.supprimerObjet(objet._id);
                alert("Objet supprimé avec succès.");
                window.location.href = "index.html"; // ou une autre page
            } catch (err) {
                alert("Erreur lors de la suppression.");
                console.error(err);
            }
        }
    });
}
