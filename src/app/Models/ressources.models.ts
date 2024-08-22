export interface RessourceModel {
    id?: number;
    titre?: string;
    description?: string;
    image?: string;
    contenu?: string;
    user_id?: number;
    categorie_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}