import { useState } from 'react';
import { signup } from '../../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('green');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      setMessage("Inscription réussie ! Redirection en cours...");
      setMessageColor('green');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err: any) {
      setMessage(err.message?.includes('Erreur HTTP') ? "Erreur lors de l’inscription. Vérifiez vos informations." : err.message || 'Erreur réseau. Veuillez réessayer.');
      setMessageColor('red');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un compte</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Adresse e-mail</label>
          <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
      <div id="signup-message" className="mt-3" style={{ color: messageColor }}>{message}</div>
    </div>
  );
};

export default Signup;
