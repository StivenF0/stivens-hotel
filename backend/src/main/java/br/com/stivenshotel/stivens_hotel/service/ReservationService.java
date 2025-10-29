package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.dto.guest.GuestResponseDTO;
import br.com.stivenshotel.stivens_hotel.dto.reservation.ReservationRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.reservation.ReservationResponseDTO;
import br.com.stivenshotel.stivens_hotel.dto.room.RoomResponseDTO;
import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeResponseDTO;
import br.com.stivenshotel.stivens_hotel.enums.ReservationStatus;
import br.com.stivenshotel.stivens_hotel.enums.RoomStatus;
import br.com.stivenshotel.stivens_hotel.model.Guest;
import br.com.stivenshotel.stivens_hotel.model.Reservation;
import br.com.stivenshotel.stivens_hotel.model.Room;
import br.com.stivenshotel.stivens_hotel.model.RoomType;
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

    public List<ReservationResponseDTO> findAll() {
        return reservationRepository.findAll().stream()
                .map(this::toReservationResponseDTO)
                .toList();
    }

    public ReservationResponseDTO findById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
        return toReservationResponseDTO(reservation);
    }

    @Transactional
    public ReservationResponseDTO create(ReservationRequestDTO requestDTO) {
        if (requestDTO.checkOutDate().isBefore(requestDTO.checkInDate())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date.");
        }

        Guest guest = guestRepository.findById(requestDTO.guestId())
                .orElseThrow(() -> new RuntimeException("Guest not found"));
        Room room = roomRepository.findById(requestDTO.roomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new IllegalStateException("Room is not available for reservation.");
        }

        long numberOfDays = ChronoUnit.DAYS.between(requestDTO.checkInDate(), requestDTO.checkOutDate());
        if (numberOfDays == 0) numberOfDays = 1;
        BigDecimal totalValue = room.getRoomType().getDailyPrice().multiply(new BigDecimal(numberOfDays));

        Reservation reservation = new Reservation();
        reservation.setCheckInDate(requestDTO.checkInDate());
        reservation.setCheckOutDate(requestDTO.checkOutDate());
        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservation.setTotalValue(totalValue);
        reservation.setGuest(guest);
        reservation.setRoom(room);

        Reservation savedReservation = reservationRepository.save(reservation);
        return toReservationResponseDTO(savedReservation);
    }

    @Transactional
    public ReservationResponseDTO update(Long id, ReservationRequestDTO requestDTO) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));

        if (requestDTO.checkOutDate().isBefore(requestDTO.checkInDate())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date.");
        }

        Guest guest = guestRepository.findById(requestDTO.guestId())
                .orElseThrow(() -> new RuntimeException("Guest not found"));
        Room room = roomRepository.findById(requestDTO.roomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        existingReservation.setCheckInDate(requestDTO.checkInDate());
        existingReservation.setCheckOutDate(requestDTO.checkOutDate());
        existingReservation.setGuest(guest);
        existingReservation.setRoom(room);

        // Recalculate total value if dates changed
        long numberOfDays = ChronoUnit.DAYS.between(requestDTO.checkInDate(), requestDTO.checkOutDate());
        if (numberOfDays == 0) numberOfDays = 1;
        BigDecimal totalValue = room.getRoomType().getDailyPrice().multiply(new BigDecimal(numberOfDays));
        existingReservation.setTotalValue(totalValue);

        Reservation updatedReservation = reservationRepository.save(existingReservation);
        return toReservationResponseDTO(updatedReservation);
    }

    @Transactional
    public void delete(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
        reservationRepository.delete(reservation);
    }

    @Transactional
    public ReservationResponseDTO checkIn(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));

        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new IllegalStateException("Only confirmed reservations can be checked in.");
        }

        Room room = reservation.getRoom();
        reservation.setStatus(ReservationStatus.IN_PROGRESS);
        room.setStatus(RoomStatus.OCCUPIED);

        Reservation updatedReservation = reservationRepository.save(reservation);
        return toReservationResponseDTO(updatedReservation);
    }

    @Transactional
    public ReservationResponseDTO checkOut(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));

        if (reservation.getStatus() != ReservationStatus.IN_PROGRESS) {
            throw new IllegalStateException("Only in-progress reservations can be checked out.");
        }

        Room room = reservation.getRoom();
        reservation.setStatus(ReservationStatus.COMPLETED);
        room.setStatus(RoomStatus.AVAILABLE);

        Reservation updatedReservation = reservationRepository.save(reservation);
        return toReservationResponseDTO(updatedReservation);
    }

    private ReservationResponseDTO toReservationResponseDTO(Reservation reservation) {
        return new ReservationResponseDTO(
                reservation.getId(),
                reservation.getCheckInDate(),
                reservation.getCheckOutDate(),
                reservation.getTotalValue(),
                reservation.getStatus(),
                toGuestResponseDTO(reservation.getGuest()),
                toRoomResponseDTO(reservation.getRoom())
        );
    }

    private GuestResponseDTO toGuestResponseDTO(Guest guest) {
        return new GuestResponseDTO(
                guest.getId(),
                guest.getFullName(),
                guest.getCpf(),
                guest.getEmail(),
                guest.getPhone()
        );
    }

    private RoomResponseDTO toRoomResponseDTO(Room room) {
        return new RoomResponseDTO(
                room.getId(),
                room.getNumber(),
                room.getFloor(),
                room.getStatus(),
                toRoomTypeResponseDTO(room.getRoomType())
        );
    }

    private RoomTypeResponseDTO toRoomTypeResponseDTO(RoomType roomType) {
        return new RoomTypeResponseDTO(
                roomType.getId(),
                roomType.getName(),
                roomType.getDescription(),
                roomType.getDailyPrice()
        );
    }
}