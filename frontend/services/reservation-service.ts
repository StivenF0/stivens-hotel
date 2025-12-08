import { api } from "@/lib/api";
import { Room } from "./room-service";

// ============================================
// TIPOS
// ============================================

export interface Guest {
  id: number;
  fullName: string;
  cpf: string;
  phone?: string;
  email?: string;
}

export interface Reservation {
  id: number;
  checkInDate: string; // LocalDate do backend (YYYY-MM-DD)
  checkOutDate: string;
  totalValue?: number; // BigDecimal no backend
  status: ReservationStatus;
  guest: Guest;
  room: Room;
}

// Enum alinhado com backend: CONFIRMED, IN_PROGRESS, COMPLETED, CANCELED
export type ReservationStatus =
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED";

// DTO para criar/atualizar reserva (alinhado com ReservationRequestDTO)
export interface CreateReservationDTO {
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string;
  guestId: number;
  roomId: number;
}

export interface UpdateReservationDTO extends Partial<CreateReservationDTO> {}

// ============================================
// SERVIÇOS
// ============================================

export const reservationService = {
  // Listar todas as reservas
  async getAll(): Promise<Reservation[]> {
    const response = await api.get<Reservation[]>("/reservations");
    return response.data;
  },

  // Buscar reserva por ID
  async getById(id: number): Promise<Reservation> {
    const response = await api.get<Reservation>(`/reservations/${id}`);
    return response.data;
  },

  // Criar nova reserva
  async create(data: CreateReservationDTO): Promise<Reservation> {
    const response = await api.post<Reservation>("/reservations", data);
    return response.data;
  },

  // Atualizar reserva
  async update(id: number, data: UpdateReservationDTO): Promise<Reservation> {
    const response = await api.put<Reservation>(`/reservations/${id}`, data);
    return response.data;
  },

  // Excluir reserva
  async delete(id: number): Promise<void> {
    await api.delete(`/reservations/${id}`);
  },

  // Check-in (POST no backend)
  async checkIn(id: number): Promise<Reservation> {
    const response = await api.post<Reservation>(
      `/reservations/${id}/check-in`
    );
    return response.data;
  },

  // Check-out (POST no backend)
  async checkOut(id: number): Promise<Reservation> {
    const response = await api.post<Reservation>(
      `/reservations/${id}/check-out`
    );
    return response.data;
  },
};
