export interface Commentaire {
    id?: number;
    contenu: string;
    user_id?: number;
    forum_id: number;
    created_at?: string; // Changez en `Date` si vous utilisez des objets Date
    updated_at?: string; // Changez en `Date` si vous utilisez des objets Date
  }
  