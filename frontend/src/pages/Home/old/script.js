import { loadNavbar } from './navbar.js';
import * as api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    chargerObjets();
});

async function chargerObjets() {
    try {
        const objets = await api.getObjets();
        afficherObjets(objets);
    } catch (err) {
        console.error("Impossible de charger les objets", err);
    }
}

function afficherObjets(objets) {
    const container = document.getElementById('objets-container');
    container.innerHTML = ''; // on vide avant d'ajouter

    objets.forEach(objet => {
        const card = document.createElement('div');
        card.classList.add('objet-card');

        card.innerHTML = `
            <a href="detail.html?id=${objet._id}">
            <img src="${objet.imageUrl}" alt="${objet.title}">
            <div class="content">
                <h3>${objet.title}</h3>
                <p>${objet.description}</p>
                <p class="price">${(objet.price / 100).toFixed(2)} €</p>
            </div>
        `;

        container.appendChild(card);
    });
}





