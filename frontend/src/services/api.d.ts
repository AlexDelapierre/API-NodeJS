// Déclarations de types pour services/api.js

export interface Objet {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export function getObjets(): Promise<Objet[]>;
// Ajoutez ici d'autres signatures si besoin (ajouterObjet, getObjetById, etc.)
