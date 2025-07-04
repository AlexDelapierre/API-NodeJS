import { loadNavbar } from './navbar.js';
import { login } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});

const form = document.getElementById('login-form');
const messageDiv = document.getElementById('login-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // try {
  //    const response = await fetch('http://localhost:3000/api/auth/login', {
  //      method: 'POST',
  //      headers: { 'Content-Type': 'application/json' },
  //      body: JSON.stringify({ email, password })
  //    });

  //   if (response.ok && data.token) {
  //     localStorage.setItem('token', data.token);
  //     messageDiv.textContent = 'Connexion réussie !';
  //     messageDiv.style.color = 'green';
  //     // Rediriger ou charger une page sécurisée :
  //     window.location.href = 'index.html';
  //   } else {
  //     messageDiv.textContent = data.error || 'Identifiants invalides.';
  //     messageDiv.style.color = 'red';
  //   }
  // } catch (err) {
  //   messageDiv.textContent = 'Erreur réseau. Veuillez réessayer.';
  //   messageDiv.style.color = 'red';
  // }

  try {
    const data = await login(email, password); // login() retourne directement les données JSON

    if (data.token) {
      localStorage.setItem('token', data.token);
      messageDiv.textContent = 'Connexion réussie !';
      messageDiv.style.color = 'green';
      window.location.href = 'index.html'; // Redirection vers page protégée
    } else {
      messageDiv.textContent = 'Identifiants invalides.';
      messageDiv.style.color = 'red';
    }
  } catch (err) {
    messageDiv.textContent =
      err.message?.includes('401')
        ? 'Identifiants incorrects.'
        : 'Erreur réseau. Veuillez réessayer.';
    messageDiv.style.color = 'red';
  }
});
