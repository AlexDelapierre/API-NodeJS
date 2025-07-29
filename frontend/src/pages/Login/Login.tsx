import { useState } from 'react';
import { login } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('green');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Connexion réussie !');
        setMessageColor('green');
        window.location.href = '/';
      } else {
        setMessage('Identifiants invalides.');
        setMessageColor('red');
      }
    } catch (err: any) {
      setMessage(err.message?.includes('401') ? 'Identifiants incorrects.' : 'Erreur réseau. Veuillez réessayer.');
      setMessageColor('red');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Se connecter</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Adresse e-mail</label>
          <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Connexion</button>
      </form>
      <div id="login-message" className="mt-3" style={{ color: messageColor }}>{message}</div>
    </div>
  );
};

export default Login;
