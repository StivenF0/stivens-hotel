package br.com.stivenshotel.stivens_hotel.dto.roomtype;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

public record RoomTypeRequestDTO(
        @NotBlank(message = "O nome não pode ser vazio.")
        String name,

        String description,

        @Min(value = 0, message = "O valor não pode ser negativo.")
        BigDecimal dailyPrice
) {}
