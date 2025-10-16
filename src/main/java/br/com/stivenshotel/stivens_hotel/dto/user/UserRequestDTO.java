package br.com.stivenshotel.stivens_hotel.dto.user;

import br.com.stivenshotel.stivens_hotel.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
    @NotBlank(message = "O nome não pode ser vazio.")
    String name,

    @NotBlank(message = "A senha não pode ser vazia.")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.")
    String password,

    Role role
) {}
