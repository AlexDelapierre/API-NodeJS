import { loadNavbar } from './navbar.js';
import { signup } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();

  const form = document.getElementById('signup-form');
  const messageDiv = document.getElementById('signup-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // try {
    //   const response = await fetch('http://localhost:3000/api/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     messageDiv.textContent = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
    //     messageDiv.style.color = 'green';
    //     form.reset();
    //   } else {
    //     messageDiv.textContent = data.error || 'Erreur lors de l’inscription.';
    //     messageDiv.style.color = 'red';
    //   }
    // } catch (err) {
    //   messageDiv.textContent = 'Erreur réseau. Veuillez réessayer.';
    //   messageDiv.style.color = 'red';
    // }

    // try {
    //   const data = await signup(email, password);  // Si erreur, elle sera catchée
    //   window.location.href = 'index.html'; // Redirection vers page protégée
    //   messageDiv.textContent = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
    //   messageDiv.style.color = 'green';
    //   form.reset();
    // } catch (err) {
    //   // On affiche une erreur personnalisée si disponible
    //   messageDiv.textContent =
    //     err.message?.includes('Erreur HTTP')
    //       ? 'Erreur lors de l’inscription. Vérifiez vos informations.'
    //       : err.message || 'Erreur réseau. Veuillez réessayer.';
    //   messageDiv.style.color = 'red';
    // }

    try {
      const data = await signup(email, password); // Appel à l'API

      // Stockage du token JWT dans le localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      // Affichage message
      messageDiv.textContent = 'Inscription réussie ! Redirection en cours...';
      messageDiv.style.color = 'green';

      // Redirection vers la page d'accueil
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000); // Petite pause pour laisser voir le message
    } catch (err) {
      messageDiv.textContent =
        err.message?.includes('Erreur HTTP')
          ? 'Erreur lors de l’inscription. Vérifiez vos informations.'
          : err.message || 'Erreur réseau. Veuillez réessayer.';
      messageDiv.style.color = 'red';
    }
  });
});
