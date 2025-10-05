package br.com.stivenshotel.stivens_hotel.repository;

import br.com.stivenshotel.stivens_hotel.enums.ReservationStatus;
import br.com.stivenshotel.stivens_hotel.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Encontra todas as reservas de um hóspede específico
    List<Reservation> findByGuestId(Long guestId);

    // Encontra todas as reservas para um quarto específico
    List<Reservation> findByRoomId(Long roomId);

    // Encontra todas as reservas com um determinado status
    List<Reservation> findByStatus(ReservationStatus status);
}