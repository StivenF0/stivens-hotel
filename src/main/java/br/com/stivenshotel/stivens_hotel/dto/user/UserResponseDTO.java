package br.com.stivenshotel.stivens_hotel.dto.user;

import br.com.stivenshotel.stivens_hotel.enums.Role;

public record UserResponseDTO(
    Long id,
    String name,
    Role role
) {}
