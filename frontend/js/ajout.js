import { loadNavbar } from './navbar.js';
import { ajouterObjet } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    const form = document.getElementById('form-vendre');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Récupérer les valeurs du formulaire
        const titre = document.getElementById('titre').value.trim();
        const prix = parseFloat(document.getElementById('prix').value);
        const description = document.getElementById('description').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        // Préparer l'objet à envoyer, prix en centimes
        const nouvelObjet = {
            title: titre,
            description: description,
            imageUrl: imageUrl,
            userId: "user-temporaire", // temporaire, à adapter plus tard
            price: Number(prix)
        };

        try {
            await ajouterObjet(nouvelObjet);
            message.textContent = "Objet ajouté avec succès !";
            message.style.color = "green";
            form.reset();
        } catch (error) {
            message.textContent = "Erreur lors de l'ajout de l'objet.";
            message.style.color = "red";
        }
    });
});
