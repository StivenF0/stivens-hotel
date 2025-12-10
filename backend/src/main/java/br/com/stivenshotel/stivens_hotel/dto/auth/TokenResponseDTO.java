package br.com.stivenshotel.stivens_hotel.dto.auth;
import br.com.stivenshotel.stivens_hotel.dto.user.UserResponseDTO;

public record TokenResponseDTO(
    String token,
    UserResponseDTO user
) {}