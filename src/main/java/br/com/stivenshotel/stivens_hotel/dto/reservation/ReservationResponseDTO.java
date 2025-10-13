package br.com.stivenshotel.stivens_hotel.dto.reservation;

import br.com.stivenshotel.stivens_hotel.dto.guest.GuestResponseDTO;
import br.com.stivenshotel.stivens_hotel.dto.room.RoomResponseDTO;
import br.com.stivenshotel.stivens_hotel.enums.ReservationStatus;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ReservationResponseDTO(
    Long id,
    LocalDate checkInDate,
    LocalDate checkOutDate,
    BigDecimal totalValue,
    ReservationStatus status,
    GuestResponseDTO guest,
    RoomResponseDTO room
) {}
