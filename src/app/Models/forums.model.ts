export interface Forum {
    id: number;
    libelle: string;
    contenu: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    date: string; // ou Date, selon le type de données que tu utilises
    comments?: Comment[]; // Ajoutez cette ligne si vous avez besoin de commentaires


  }
  