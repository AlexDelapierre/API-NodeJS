import { loadNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});

const form = document.getElementById('login-form');
const messageDiv = document.getElementById('login-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      messageDiv.textContent = 'Connexion réussie !';
      messageDiv.style.color = 'green';
      // Rediriger ou charger une page sécurisée :
      window.location.href = 'index.html';
    } else {
      messageDiv.textContent = data.error || 'Identifiants invalides.';
      messageDiv.style.color = 'red';
    }
  } catch (err) {
    messageDiv.textContent = 'Erreur réseau. Veuillez réessayer.';
    messageDiv.style.color = 'red';
  }
});
