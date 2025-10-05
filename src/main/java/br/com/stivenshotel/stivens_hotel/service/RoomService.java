package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.enums.RoomStatus;
import br.com.stivenshotel.stivens_hotel.model.Room;
import br.com.stivenshotel.stivens_hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room create(Room room) {
        if (roomRepository.findByNumber(room.getNumber()).isPresent()) {
            throw new RuntimeException("Room with number " + room.getNumber() + " already exists.");
        }

        // Define o status inicial para qualquer novo quarto
        room.setStatus(RoomStatus.AVAILABLE);

        return roomRepository.save(room);
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Room findById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found by id: " + id));
    }

    public Room update(Long id, Room roomDetails) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (!optionalRoom.isPresent()) {
            throw new RuntimeException("Room not found by id: " + id);
        }

        Room room = optionalRoom.get();
        room.setId(roomDetails.getId());
        room.setFloor(roomDetails.getFloor());
        room.setStatus(roomDetails.getStatus());
        room.setRoomType(roomDetails.getRoomType());

        return roomRepository.save(room);
    }

    public void delete(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        room.ifPresent(roomRepository::delete);
    }
}
