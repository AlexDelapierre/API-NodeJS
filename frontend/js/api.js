const API_BASE_URL = "http://localhost:3000/api";

// Fonction générique pour toutes les requêtes API
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token'); // récupère le token JWT

    // On ne définit Content-Type que si ce n’est pas du FormData
    const isFormData = options.body instanceof FormData;

    const defaultHeaders = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { "Content-Type": "application/json" })
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
    return await request("/stuff", { method: "GET" });
}

// Récupérer un objet en fonction de son ID
export async function getObjetById(id) {
    return await request(`/stuff/${id}`, { method: "GET" });
}


// Ajouter un objet
// export async function ajouterObjet(objet) {
//     return await request("/stuff", {
//         method: "POST",
//         body: JSON.stringify(objet)
//     });
// }
  
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

// Ajouter un objet avec image (FormData)
export async function ajouterObjet(formData) {
    return await request("/stuff", {
        method: "POST",
        body: formData
    });
}


// Ajouter un objet avec image (FormData) avec exemple sans la fonction générique request()
// export async function ajouterObjet(objetFormData) {
//     const token = localStorage.getItem('token');

//     const response = await fetch(`${API_BASE_URL}/stuff`, {
//         method: "POST",
//         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//         body: objetFormData // Pas de JSON.stringify, c’est un FormData
//     });

//     if (!response.ok) {
//         throw new Error(`Erreur HTTP ${response.status}`);
//     }

//     return await response.json();
// }
    

// Modifier un objet avec la fonction générique request()
// export async function updateObjet(id, objet) {
//     return await request(`/stuff/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(objet)
//     });
// }

// export async function updateObjet(id, objet) {
//     const response = await fetch(`http://localhost:3000/api/stuff/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(objet)
//     });

//     if (!response.ok) {
//         throw new Error('Erreur lors de la mise à jour de l’objet');
//     }

//     return await response.json();
// }

// Modifier un objet avec image (FormData)
export async function updateObjet(id, formData) {
    return await request(`/stuff/${id}`, {
        method: "PUT",
        body: formData
    });
}

// Modifier un objet avec image (FormData) avec exemple sans la fonction générique request()
// export async function updateObjet(id, formData) {
//     const token = localStorage.getItem('token');

//     const response = await fetch(`${API_BASE_URL}/stuff/${id}`, {
//         method: "PUT",
//         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//         body: formData
//     });

//     if (!response.ok) {
//         throw new Error(`Erreur HTTP ${response.status}`);
//     }

//     return await response.json();
// }

export async function supprimerObjet(id) {
    return await request(`/stuff/${id}`, { method: "DELETE" });
}

// Créer un nouvel utilisateur (inscription)
export async function signup(email, password) {
    return await request("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}

// Connexion de l'utilisateur
export async function login(email, password) {
    return await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}

