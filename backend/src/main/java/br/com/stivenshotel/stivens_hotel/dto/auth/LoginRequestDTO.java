package br.com.stivenshotel.stivens_hotel.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
    @NotBlank(message = "O nome não pode ser vazio.")
    String name,

    @NotBlank(message = "A senha não pode ser vazia.")
    String password
) {}
