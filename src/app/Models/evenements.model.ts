export interface Evenement {
  id?: number;
  theme?: string;
  description?: string;
  lieu?: string;
  nombre_places?: string;
  date_debut?: Date; // Peut être undefined
  date_fin?: Date; // Peut être undefined
  prix?: number;
  image?: string;
  deleted_at?: Date | null; // Champ optionnel pour les suppressions douces
  created_at: Date;
  updated_at: Date;
}
