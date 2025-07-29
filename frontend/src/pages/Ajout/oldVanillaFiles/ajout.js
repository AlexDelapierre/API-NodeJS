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
        const imageFile = document.getElementById('image').files[0];

        // Préparer l'objet à envoyer, prix en centimes
        // const objet = {
        //     title: titre,
        //     description: description,
        //     imageUrl: imageUrl,
        //     userId: "user-temporaire", // temporaire, à adapter plus tard
        //     price: Number(prix)
        // };

        // try {
        // if (idObjet) {
        //     await updateObjet(idObjet, objet);
        //     message.textContent = "Objet mis à jour avec succès !";
        //     window.location.href = "index.html"; 
        // } else {
        //     await ajouterObjet(objet);
        //     message.textContent = "Objet ajouté avec succès !";
        //     form.reset(); // seulement si succès
        //     window.location.href = "index.html"; 
        // }
        //     message.style.color = "green";
        // } catch (error) {
        //     message.textContent = "Erreur lors de l'envoi du formulaire.";
        //     message.style.color = "red";
        // }  
        
        // Préparer l'objet à envoyer.
        const formData = new FormData();
        formData.append('title', titre);
        formData.append('price', prix);
        formData.append('description', description);
        formData.append('userId', 'user-temporaire'); // à adapter plus tard

        if (imageFile) {
            formData.append('image', imageFile);
        }
       
        try {
            if (idObjet) {
                await updateObjet(idObjet, formData);
                message.textContent = "Objet mis à jour avec succès !";
                window.location.href = "index.html";
            } else {
                await ajouterObjet(formData);
                message.textContent = "Objet ajouté avec succès !";
                form.reset();
                window.location.href = "index.html";
            }
            message.style.color = "green";
        } catch (error) {
            message.textContent = "Erreur lors de l'envoi du formulaire.";
            message.style.color = "red";
        }
    });
});
