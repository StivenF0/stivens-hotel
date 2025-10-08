package br.com.stivenshotel.stivens_hotel.controller;

import br.com.stivenshotel.stivens_hotel.model.Reservation;
import br.com.stivenshotel.stivens_hotel.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody Reservation reservation) {
        Reservation newReservation = reservationService.create(reservation);
        return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.findAll();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.findById(id);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @Valid @RequestBody Reservation reservationDetails) {
        Reservation updatedReservation = reservationService.update(id, reservationDetails);
        return ResponseEntity.ok(updatedReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para realizar o Check-in
    @PostMapping("/{id}/check-in")
    public ResponseEntity<Reservation> checkInReservation(@PathVariable Long id) {
        Reservation reservation = reservationService.checkIn(id);
        return ResponseEntity.ok(reservation);
    }

    // Endpoint para realizar o Check-out
    @PostMapping("/{id}/check-out")
    public ResponseEntity<Reservation> checkOutReservation(@PathVariable Long id) {
        Reservation reservation = reservationService.checkOut(id);
        return ResponseEntity.ok(reservation);
    }
}