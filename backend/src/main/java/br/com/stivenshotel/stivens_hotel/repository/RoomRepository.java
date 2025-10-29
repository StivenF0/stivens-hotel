package br.com.stivenshotel.stivens_hotel.repository;

import br.com.stivenshotel.stivens_hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByNumber(String number);
}
