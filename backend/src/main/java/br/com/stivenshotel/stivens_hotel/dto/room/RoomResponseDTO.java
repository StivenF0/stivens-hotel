package br.com.stivenshotel.stivens_hotel.dto.room;

import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeResponseDTO;
import br.com.stivenshotel.stivens_hotel.enums.RoomStatus;

public record RoomResponseDTO(
    Long id,
    String number,
    Integer floor,
    RoomStatus status,
    RoomTypeResponseDTO roomType
) {}
