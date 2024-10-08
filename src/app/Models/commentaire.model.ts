export interface Commentaire {
    id?: number;
    contenu: string;
    user_id?: number;
    discussion_id: number;
    created_at?: string; // Changez en `Date` si vous utilisez des objets Date
    updated_at?: string; // Changez en `Date` si vous utilisez des objets Date
    user: {
        id: number;
        name: string;
        email: string;
        telephone: string;
        photo: string;
      };
  }
  ///