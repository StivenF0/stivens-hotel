package br.com.stivenshotel.stivens_hotel.dto.auth;

public record TokenResponseDTO(
    String token,
    String type
) {
    public TokenResponseDTO(String token) {
        this("Bearer", token);
    }
}
