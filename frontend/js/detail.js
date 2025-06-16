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
        <div class="objet-detail">
            <img src="${objet.imageUrl}" alt="${objet.title}">
            <div class="content">
                <h3>${objet.title}</h3>
                <p>${objet.description}</p>
                <p class="price">${(objet.price / 100).toFixed(2)} €</p>
            </div>
        </div>
    `;
}
