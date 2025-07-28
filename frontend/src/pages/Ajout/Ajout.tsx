import { useEffect, useRef, useState } from 'react';

// À adapter selon vos services API
// import { ajouterObjet, getObjetById, updateObjet } from '../../services/api';

interface ObjetForm {
  title: string;
  price: number;
  description: string;
  image?: File | null;
}

const fetchObjetById = async (id: string) => {
  // À remplacer par votre appel API réel
  const response = await fetch(`/api/objets/${id}`);
  if (!response.ok) throw new Error('Erreur lors du chargement de l\'objet');
  return response.json();
};

const sendObjet = async (formData: FormData, id?: string) => {
  // À remplacer par votre appel API réel
  const url = id ? `/api/objets/${id}` : '/api/objets';
  const method = id ? 'PUT' : 'POST';
  const response = await fetch(url, { method, body: formData });
  if (!response.ok) throw new Error("Erreur lors de l'envoi du formulaire.");
  return response.json();
};

const Ajout = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('green');
  const [form, setForm] = useState<ObjetForm>({ title: '', price: 0, description: '', image: null });
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Récupérer l'id depuis l'URL si mode édition
    const params = new URLSearchParams(window.location.search);
    const idObjet = params.get('id');
    if (idObjet) {
      setIsEdit(true);
      fetchObjetById(idObjet)
        .then(objet => setForm({ title: objet.title, price: objet.price, description: objet.description, image: null }))
        .catch(() => {
          setMessage("Erreur lors du chargement de l'objet.");
          setMessageColor('red');
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (id === 'image' && files) {
      setForm(f => ({ ...f, image: files[0] }));
    } else {
      setForm(f => ({ ...f, [id]: id === 'price' ? Number(value) : value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const idObjet = params.get('id');
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', String(form.price));
    formData.append('description', form.description);
    formData.append('userId', 'user-temporaire'); // à adapter plus tard
    if (form.image) formData.append('image', form.image);
    try {
      await sendObjet(formData, idObjet || undefined);
      setMessage(idObjet ? 'Objet mis à jour avec succès !' : 'Objet ajouté avec succès !');
      setMessageColor('green');
      formRef.current?.reset();
      window.location.href = '/'; // Redirection vers la page d'accueil
    } catch {
      setMessage("Erreur lors de l'envoi du formulaire.");
      setMessageColor('red');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{isEdit ? 'Modifier un objet' : 'Vendre un objet'}</h1>
      <div id="message" className="mt-3" style={{ color: messageColor }}>{message}</div>
      <form id="form-vendre" ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titre" className="form-label">Titre</label>
          <input type="text" className="form-control" id="title" placeholder="Entrez le titre de l'objet" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="prix" className="form-label">Prix (€)</label>
          <input type="number" className="form-control" id="price" placeholder="Entrez le prix" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows={4} placeholder="Décrivez votre objet" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Ajouter une image</label>
          <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Valider</button>
      </form>
    </div>
  );
};

export default Ajout;
