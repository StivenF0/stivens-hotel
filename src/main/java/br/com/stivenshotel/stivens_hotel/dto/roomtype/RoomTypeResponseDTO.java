package br.com.stivenshotel.stivens_hotel.dto.roomtype;

import java.math.BigDecimal;

public record RoomTypeResponseDTO(
    Long id,
    String name,
    String description,
    BigDecimal dailyPrice,
) {}