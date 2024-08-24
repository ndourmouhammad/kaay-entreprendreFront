export interface Comments {
    id?: number;
    contenu: string;
    user_id?: number;
    discussion_id: number;
    created_at?: string; // Changez en `Date` si vous utilisez des objets Date
    updated_at?: string; // Changez en `Date` si vous utilisez des objets Date
  }
  
  
  export interface Discussion {
    id: number;
    libelle: string;
    contenu: string;
    user_id?: number;
    created_at: string;
    updated_at: string;
    date: string; // ou Date, selon le type de données que tu utilises
    comments?: Comments[]; // Ajoutez cette ligne si vous avez besoin de commentaires
    user?: {
        id?: number;
        name?: string;
        email?: string;
        telephone?: string;
        photo?: string;
      };
  }