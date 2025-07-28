import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie la présence d'un token pour l'état de connexion
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1>VendreMesObjets</h1>
        <nav>
          <ul>
            <li><Link to="/">Objets à vendre</Link></li>
            <li><Link id="nav-addObject" to="/ajout">Vendre un objet</Link></li>
          </ul>
        </nav>
      </div>
      <div className="navbar-right">
        <ul>
          {!isLoggedIn && (
            <>
              <li id="nav-signup"><Link to="/signup">Inscription</Link></li>
              <li id="nav-login"><Link to="/login">Connexion</Link></li>
            </>
          )}
          {isLoggedIn && (
            <li id="nav-logout"><a href="#" id="logout-btn" onClick={handleLogout}>Déconnexion</a></li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
