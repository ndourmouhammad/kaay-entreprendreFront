import { Commentaire } from "./commentaire.model";

export interface Comments {
    id?: number;
    contenu: string;
    user_id?: number;
    discussion_id: number;
    created_at?: string; 
    updated_at?: string; 
  }
  
  
//   export interface Discussion {
//     id: number;
//     libelle: string;
//     contenu: string;
//     user_id?: number;
//     created_at: string;
//     updated_at: string;
//     date: string; 
//     comments?: Comments[]; 
//     user?: {
//       id?: number;
//       name?: string;
//       email?: string;
//       telephone?: string;
//       photo?: string;
//     };
//   }

export interface Discussion {
  id: number;
  libelle: string;
  contenu: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
  date: string; // or Date, according to your data type
  commentaires?: Commentaire[]; // Use 'commentaires' to match the API response
  user?: {
    id?: number;
    name?: string;
    email?: string;
    telephone?: string;
    photo?: string;
  };
}
