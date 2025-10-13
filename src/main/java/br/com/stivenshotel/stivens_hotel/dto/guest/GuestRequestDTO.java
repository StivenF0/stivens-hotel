package br.com.stivenshotel.stivens_hotel.dto.guest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record GuestRequestDTO(
    @NotBlank(message = "O nome não pode ser vazio.")
    @Size(min = 3, max = 100, message = "O nome completo deve ter entre 3 e 100 caracteres.")
    String fullName,

    @NotBlank(message = "O CPF não pode ser vazio.")
    @Pattern(regexp = "\\d{11}", message = "O CPF deve conter 11 dígitos.")
    String cpf,

    @Size(max = 20, message = "O telefone não pode ter mais de 20 caracteres.")
    String phone,

    @Email(message = "O formato do email é inválido.")
    @NotBlank(message = "O email não pode ser vazio.")
    String email
) {}
