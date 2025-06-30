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

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch (e) {
        console.error("Erreur lors du décodage du token :", e);
        return null;
    }
}


async function chargerObjetDetail(id) {
    try {
        const objet = await api.getObjetById(id);
        afficherObjetDetail(objet);
    } catch (err) {
        console.error("Impossible de charger l'objet", err);
    }
}

/*
function afficherObjetDetail(objet) {
    const container = document.getElementById('detail-container');
    const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
    
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
                window.location.href = "index.html"; 
                // alert("Objet supprimé avec succès.");
            } catch (err) {
                alert("Erreur lors de la suppression.");
                console.error(err);
            }
        }
    });
}
*/

function afficherObjetDetail(objet) {
    const container = document.getElementById('detail-container');
    const currentUserId = getUserIdFromToken();

    const estProprietaire = currentUserId && currentUserId === objet.userId;

    // Construction des boutons conditionnels
    let boutonsHTML = '';

    if (estProprietaire) {
        boutonsHTML = `
            <button class="btn-edit">Modifier</button>
            <button class="btn-delete">Supprimer</button>
        `;
    } else {
        boutonsHTML = `<button class="btn-buy">Acheter</button>`;
    }

    // Injection dans le DOM
    container.innerHTML = `
        <div class="card">
            <img src="${objet.imageUrl}" alt="${objet.title}">
            <div class="card-content">
                <h3>${objet.title}</h3>
                <p>${objet.description}</p>
                <p class="price">${(objet.price / 100).toFixed(2)} €</p>
            </div>
            <div class="card-buttons">
                ${boutonsHTML}
            </div>
        </div>
    `;

    if (estProprietaire) {
        const btnEdit = container.querySelector('.btn-edit');
        const btnDelete = container.querySelector('.btn-delete');

        btnEdit.addEventListener('click', () => {
            window.location.href = `ajout.html?id=${objet._id}`;
        });

        btnDelete.addEventListener('click', async () => {
            if (confirm("Êtes-vous sûr de vouloir supprimer cet objet ?")) {
                try {
                    await api.supprimerObjet(objet._id);
                    window.location.href = "index.html";
                } catch (err) {
                    alert("Erreur lors de la suppression.");
                    console.error(err);
                }
            }
        });
    } else {
        const btnBuy = container.querySelector('.btn-buy');
        btnBuy.addEventListener('click', () => {
            alert("Fonction d'achat à implémenter !");
        });
    }
}


