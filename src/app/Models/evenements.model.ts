export interface EvenementModel {
    id?: number
    theme?: string
    description?: string
    date_debut?: string
    date_fin?: string
    lieu?: string
    image?: string
    prix?: string
    nombre_places?: number
    createdAt?: Date
    updatedAt?: Date
}