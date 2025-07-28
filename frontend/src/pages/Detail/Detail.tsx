import { useEffect, useState } from 'react';

// À adapter selon vos services API
// import { getObjetById, supprimerObjet } from '../../services/api';

interface ObjetDetail {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
}

const fetchObjetById = async (id: string): Promise<ObjetDetail> => {
  const response = await fetch(`/api/objets/${id}`);
  if (!response.ok) throw new Error('Erreur lors du chargement de l\'objet');
  return response.json();
};

const deleteObjet = async (id: string) => {
  const response = await fetch(`/api/objets/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erreur lors de la suppression.');
};

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  } catch {
    return null;
  }
};

const Detail = () => {
  const [objet, setObjet] = useState<ObjetDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idObjet = params.get('id');
    if (idObjet) {
      fetchObjetById(idObjet)
        .then(setObjet)
        .catch(() => setError("Impossible de charger l'objet"))
        .finally(() => setLoading(false));
    } else {
      setError('Aucun identifiant fourni.');
      setLoading(false);
    }
  }, []);

  const handleEdit = () => {
    if (objet) window.location.href = `/ajout?id=${objet._id}`;
  };

  const handleDelete = async () => {
    if (objet && window.confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
      try {
        await deleteObjet(objet._id);
        setMessage('Objet supprimé avec succès.');
        setTimeout(() => (window.location.href = '/'), 1000);
      } catch {
        setMessage('Erreur lors de la suppression.');
      }
    }
  };

  const handleBuy = () => {
    alert('Fonction d\'achat à implémenter !');
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!objet) return null;

  const currentUserId = getUserIdFromToken();
  const estProprietaire = currentUserId && currentUserId === objet.userId;

  return (
    <div className="detail-section">
      <div className="back-link">
        <a href="/">&laquo; Retour</a>
      </div>
      <section id="detail-container">
        <div className="card">
          <img src={objet.imageUrl} alt={objet.title} />
          <div className="card-content">
            <h3>{objet.title}</h3>
            <p>{objet.description}</p>
            <p className="price">{(objet.price / 100).toFixed(2)} €</p>
          </div>
          <div className="card-buttons">
            {estProprietaire ? (
              <>
                <button className="btn-edit" onClick={handleEdit}>Modifier</button>
                <button className="btn-delete" onClick={handleDelete}>Supprimer</button>
              </>
            ) : (
              <button className="btn-buy" onClick={handleBuy}>Acheter</button>
            )}
          </div>
        </div>
        {message && <div style={{ color: 'green', marginTop: 10 }}>{message}</div>}
      </section>
    </div>
  );
};

export default Detail;
