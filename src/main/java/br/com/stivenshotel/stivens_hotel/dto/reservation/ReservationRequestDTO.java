package br.com.stivenshotel.stivens_hotel.dto.reservation;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.FutureOrPresent;
import java.time.LocalDate;

public record ReservationRequestDTO(
    @NotNull(message = "A data de check-in não pode ser nula")
    @FutureOrPresent(message = "A data de check-in deve ser hoje ou uma data futura")
    LocalDate checkInDate,

    @NotNull(message = "A data de check-out não pode ser nula")
    @FutureOrPresent(message = "A data de check-out deve ser hoje ou uma data futura")
    LocalDate checkOutDate,

    @NotNull(message = "O ID do hóspede não pode ser nulo")
    Long guestId,

    @NotNull(message = "O ID do quarto não pode ser nulo")
    Long roomId
) {}
