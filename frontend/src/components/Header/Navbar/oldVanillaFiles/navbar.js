export function loadNavbar() {
    fetch('./navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            // Attendre que le HTML soit injecté pour manipuler les éléments
            const token = localStorage.getItem('token');

            const loginLink = document.getElementById('nav-login');
            const signupLink = document.getElementById('nav-signup');
            const logoutLink = document.getElementById('nav-logout');
            const addObjectLink = document.getElementById('nav-addObject');

            if (token) {
                // Utilisateur connecté : afficher "Déconnexion", cacher "Connexion" et "Inscription"
                loginLink.style.display = 'none';
                signupLink.style.display = 'none';
                logoutLink.style.display = 'block';

                document.getElementById('logout-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    window.location.href = 'index.html';
                });
            } else {
                // Utilisateur non connecté
                loginLink.style.display = 'block';
                signupLink.style.display = 'block';
                logoutLink.style.display = 'none';
            }

            if (addObjectLink) {
                addObjectLink.addEventListener('click', (event) => {
                    if (!token) {
                        event.preventDefault(); // important : empêche le lien de s'ouvrir
                        window.location.href = "login.html";
                    }
                });
            } else {
                console.warn("L'élément #nav-addObject n'a pas été trouvé dans la navbar.");
            }
        })
        .catch(error => console.error('Erreur lors du chargement de la navbar:', error));
}

