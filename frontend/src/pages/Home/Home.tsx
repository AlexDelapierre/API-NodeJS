import { useEffect, useState } from 'react';
import { getObjets } from '../../services/api';

interface Objet {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Home = () => {
  const [objets, setObjets] = useState<Objet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getObjets()
      .then(setObjets)
      .catch((err: any) => setError(err.message));
  }, []);

  return (
    <div>
      <section className="hero"></section>
      <section className="categories">
        <div id="objets-container" className="objets-grid">
          {error && <p style={{color: 'red'}}>{error}</p>}
          {objets.map((objet) => (
            <div className="objet-card" key={objet._id}>
              <a href={`/detail?id=${objet._id}`}> 
                <img src={objet.imageUrl} alt={objet.title} />
                <div className="content">
                  <h3>{objet.title}</h3>
                  <p>{objet.description}</p>
                  <p className="price">{(objet.price / 100).toFixed(2)} €</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
