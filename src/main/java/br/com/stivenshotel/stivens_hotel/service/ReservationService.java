package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.enums.ReservationStatus;
import br.com.stivenshotel.stivens_hotel.enums.RoomStatus;
import br.com.stivenshotel.stivens_hotel.model.Guest;
import br.com.stivenshotel.stivens_hotel.model.Reservation;
import br.com.stivenshotel.stivens_hotel.model.Room;
import br.com.stivenshotel.stivens_hotel.repository.GuestRepository;
import br.com.stivenshotel.stivens_hotel.repository.ReservationRepository;
import br.com.stivenshotel.stivens_hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;

    public ReservationService(ReservationRepository reservationRepository, GuestRepository guestRepository, RoomRepository roomRepository) {
        this.reservationRepository = reservationRepository;
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Reservation findById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
    }

    @Transactional
    public Reservation create(Reservation reservation) {
        if (reservation.getCheckOutDate().isBefore(reservation.getCheckInDate())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date.");
        }

        Guest guest = guestRepository.findById(reservation.getGuest().getId())
                .orElseThrow(() -> new RuntimeException("Guest not found"));
        Room room = roomRepository.findById(reservation.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new IllegalStateException("Room is not available for reservation.");
        }

        long numberOfDays = ChronoUnit.DAYS.between(reservation.getCheckInDate(), reservation.getCheckOutDate());
        if (numberOfDays == 0) numberOfDays = 1;
        BigDecimal totalValue = room.getRoomType().getDailyPrice().multiply(new BigDecimal(numberOfDays));

        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservation.setTotalValue(totalValue);
        reservation.setGuest(guest);
        reservation.setRoom(room);

        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation update(Long id, Reservation reservationDetails) {
        Reservation existingReservation = findById(id);

        existingReservation.setCheckInDate(reservationDetails.getCheckInDate());
        existingReservation.setCheckOutDate(reservationDetails.getCheckOutDate());

        // Recalcula o valor se as datas mudarem
        long numberOfDays = ChronoUnit.DAYS.between(existingReservation.getCheckInDate(), existingReservation.getCheckOutDate());
        if (numberOfDays == 0) numberOfDays = 1;
        BigDecimal totalValue = existingReservation.getRoom().getRoomType().getDailyPrice().multiply(new BigDecimal(numberOfDays));
        existingReservation.setTotalValue(totalValue);

        return reservationRepository.save(existingReservation);
    }

    public void delete(Long id) {
        Reservation reservation = findById(id);
        reservationRepository.delete(reservation);
    }

    @Transactional
    public Reservation checkIn(Long id) {
        Reservation reservation = findById(id);
        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new IllegalStateException("Only confirmed reservations can be checked in.");
        }

        Room room = reservation.getRoom();

        // Atualiza os status
        reservation.setStatus(ReservationStatus.IN_PROGRESS);
        room.setStatus(RoomStatus.OCCUPIED);

        // Salva as entidades atualizadas
        roomRepository.save(room);
        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation checkOut(Long id) {
        Reservation reservation = findById(id);
        if (reservation.getStatus() != ReservationStatus.IN_PROGRESS) {
            throw new IllegalStateException("Only in-progress reservations can be checked out.");
        }

        Room room = reservation.getRoom();

        // Atualiza os status
        reservation.setStatus(ReservationStatus.COMPLETED);
        room.setStatus(RoomStatus.CLEANING);

        // Salva as entidades atualizadas
        roomRepository.save(room);
        return reservationRepository.save(reservation);
    }
}