import { SecteurActiviteModel } from "./secteuractivite.model"

export interface UserModel {
    id?: number
    secteuractivite_id?: number
    name?: string
    email?: string
    password?: string
    photo?: string
    adresse?: string
    telephone?: string
    statut?: boolean
    cv?: string
    createdAt?: Date
    updatedAt?: Date
    secteur_activite_id?: number;
  secteur_activite?: SecteurActiviteModel;
}