package br.com.stivenshotel.stivens_hotel.controller;

import br.com.stivenshotel.stivens_hotel.dto.reservation.ReservationRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.reservation.ReservationResponseDTO;
import br.com.stivenshotel.stivens_hotel.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationResponseDTO> createReservation(@Valid @RequestBody ReservationRequestDTO reservationRequest) {
        ReservationResponseDTO newReservation = reservationService.create(reservationRequest);
        return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ReservationResponseDTO>> getAllReservations() {
        List<ReservationResponseDTO> reservations = reservationService.findAll();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponseDTO> getReservationById(@PathVariable Long id) {
        ReservationResponseDTO reservation = reservationService.findById(id);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationResponseDTO> updateReservation(
            @PathVariable Long id,
            @Valid @RequestBody ReservationRequestDTO reservationRequest) {
        ReservationResponseDTO updatedReservation = reservationService.update(id, reservationRequest);
        return ResponseEntity.ok(updatedReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/check-in")
    public ResponseEntity<ReservationResponseDTO> checkInReservation(@PathVariable Long id) {
        ReservationResponseDTO reservation = reservationService.checkIn(id);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping("/{id}/check-out")
    public ResponseEntity<ReservationResponseDTO> checkOutReservation(@PathVariable Long id) {
        ReservationResponseDTO reservation = reservationService.checkOut(id);
        return ResponseEntity.ok(reservation);
    }
}