export interface ReservationModel {
    id: number;
    status: string;
    user_id: number;
    evenement_id: number;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      name: string;
    };
  }
  