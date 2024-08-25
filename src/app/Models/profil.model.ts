export interface ModelProfil {
    id?: number;
    name?: string;
    email?: string;
    secteur_activite_id?: number;  // Assurez-vous que le nom et le type sont corrects
    adresse?: string;
    telephone?: string;  // Changez de 'number' à 'string' si nécessaire
    statut?: boolean;
    photo?: string;
    cv?: string;
  }
  