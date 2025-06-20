// api.js
const API_BASE_URL = "http://localhost:3000/api/stuff";

// Fonction générique pour toutes les requêtes API
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        "Content-Type": "application/json"
    };

    const config = {
        headers: defaultHeaders,
        ...options
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la requête API :", error);
        throw error;
    }
}

// Méthodes API exportées

// Récupérer tous les objets
export async function getObjets() {
    return await request("", { method: "GET" });
}

// Récupérer un objet en fonction de son ID
export async function getObjetById(id) {
    return await request(`/${id}`, { method: "GET" });
}


// Ajouter un objet
export async function ajouterObjet(objet) {
    return await request("", {
        method: "POST",
        body: JSON.stringify(objet)
    });
}
  
/*
// Ajouter un objet avec exemple sans la fonction générique request()
export async function ajouterObjet(objet) {
    const response = await fetch('http://localhost:3000/api/stuff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objet)
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la requête POST');
    }
    return await response.json();
}
*/

export async function updateObjet(id, objet) {
    const response = await fetch(`http://localhost:3000/api/stuff/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objet)
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l’objet');
    }

    return await response.json();
}


export async function supprimerObjet(id) {
    return await request(`/${id}`, { method: "DELETE" });
}
