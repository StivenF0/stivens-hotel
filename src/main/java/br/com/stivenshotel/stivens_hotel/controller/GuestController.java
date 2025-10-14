package br.com.stivenshotel.stivens_hotel.controller;

import br.com.stivenshotel.stivens_hotel.dto.guest.GuestRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.guest.GuestResponseDTO;
import br.com.stivenshotel.stivens_hotel.service.GuestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {
    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping
    public ResponseEntity<List<GuestResponseDTO>> getAllGuests() {
        List<GuestResponseDTO> guests = guestService.findAll();
        return ResponseEntity.ok(guests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestResponseDTO> getGuestById(@PathVariable Long id) {
        GuestResponseDTO guest = guestService.findById(id);
        return ResponseEntity.ok(guest);
    }

    @PostMapping
    public ResponseEntity<GuestResponseDTO> createGuest(@Valid @RequestBody GuestRequestDTO guestRequest) {
        GuestResponseDTO newGuest = guestService.create(guestRequest);
        return new ResponseEntity<>(newGuest, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuestResponseDTO> updateGuest(@PathVariable Long id, @Valid @RequestBody GuestRequestDTO guestRequest) {
        GuestResponseDTO updatedGuest = guestService.update(id, guestRequest);
        return ResponseEntity.ok(updatedGuest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
