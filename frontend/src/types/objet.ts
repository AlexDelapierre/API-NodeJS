export interface Objet {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  image?: File | null; // Optionnel pour le formulaire d'ajout/édition
}
