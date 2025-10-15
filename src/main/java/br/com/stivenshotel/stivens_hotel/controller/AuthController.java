package br.com.stivenshotel.stivens_hotel.controller;

import br.com.stivenshotel.stivens_hotel.dto.auth.LoginRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.auth.TokenResponseDTO;
import br.com.stivenshotel.stivens_hotel.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequest) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(
                loginRequest.name(),
                loginRequest.password()
        );

        Authentication auth = authenticationManager.authenticate(usernamePassword);
        TokenResponseDTO tokenResponse = tokenService.generateToken(auth);

        return ResponseEntity.ok(tokenResponse);
    }
}
