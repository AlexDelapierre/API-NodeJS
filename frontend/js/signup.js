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

    try {
      // const response = await signup(email, password);

      // const response = await fetch('http://localhost:3000/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });

      // const data = await response.json();

      const data = await signup(email, password);

      if (response.ok) {
        messageDiv.textContent = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        messageDiv.style.color = 'green';
        form.reset();
      } else {
        messageDiv.textContent = data.error || 'Erreur lors de l’inscription.';
        messageDiv.style.color = 'red';
      }
    } catch (err) {
      messageDiv.textContent = 'Erreur réseau. Veuillez réessayer.';
      messageDiv.style.color = 'red';
    }
  });
});
