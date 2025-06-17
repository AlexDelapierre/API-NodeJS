import { loadNavbar } from './navbar.js';
import { ajouterObjet, getObjetById, updateObjet } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    loadNavbar();
    const form = document.getElementById('form-vendre');
    const message = document.getElementById('message');

    const params = new URLSearchParams(window.location.search);
    const idObjet = params.get('id');

    if (idObjet) {
        // Mode édition → on pré-remplit les champs
        try {
            const objet = await getObjetById(idObjet);
            document.getElementById('titre').value = objet.title;
            document.getElementById('prix').value = objet.price;
            document.getElementById('description').value = objet.description;
            document.getElementById('imageUrl').value = objet.imageUrl;

            // Optionnel : changer le titre du formulaire ou bouton
            // document.querySelector('h2').textContent = "Modifier l'objet";
            // document.querySelector('button[type="submit"]').textContent = "Mettre à jour";
        } catch (error) {
            message.textContent = "Erreur lors du chargement de l'objet.";
            message.style.color = "red";
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Récupérer les valeurs du formulaire
        const titre = document.getElementById('titre').value.trim();
        const prix = parseFloat(document.getElementById('prix').value);
        const description = document.getElementById('description').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        // Préparer l'objet à envoyer, prix en centimes
        const objet = {
            title: titre,
            description: description,
            imageUrl: imageUrl,
            userId: "user-temporaire", // temporaire, à adapter plus tard
            price: Number(prix)
        };

        // try {
        //     await ajouterObjet(objet);
        //     message.textContent = "Objet ajouté avec succès !";
        //     message.style.color = "green";
        //     form.reset();
        // } catch (error) {
        //     message.textContent = "Erreur lors de l'ajout de l'objet.";
        //     message.style.color = "red";
        // }

        try {
        if (idObjet) {
            await updateObjet(idObjet, objet);
            message.textContent = "Objet mis à jour avec succès !";
        } else {
            await ajouterObjet(objet);
            message.textContent = "Objet ajouté avec succès !";
            form.reset(); // seulement si succès
        }
            message.style.color = "green";
        } catch (error) {
            message.textContent = "Erreur lors de l'envoi du formulaire.";
            message.style.color = "red";
        }        
    });
});
