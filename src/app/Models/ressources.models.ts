export interface RessourceModel {
    id?: number;
    titre?: string;
    description?: string;
    image?: string;
    contenu?: string;
    user_id?: number;
    categorie_id?: number; // Identifiant de la catégorie
    created_at?: Date;
    updatedAt?: Date;
  }
  