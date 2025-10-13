package br.com.stivenshotel.stivens_hotel.dto.guest;

public record GuestResponseDTO(
    Long id,
    String fullName,
    String cpf,
    String phone,
    String email
) {}
