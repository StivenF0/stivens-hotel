package br.com.stivenshotel.stivens_hotel.dto.room;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public record RoomRequestDTO(
    @NotBlank(message = "O número do quarto não pode ser vazio")
    String number,

    @NotNull(message = "O andar não pode ser nulo")
    @Min(value = 1, message = "O andar deve ser maior que 0")
    Integer floor,

    @NotNull(message = "O tipo do quarto não pode ser nulo")
    Long roomTypeId
) {}
