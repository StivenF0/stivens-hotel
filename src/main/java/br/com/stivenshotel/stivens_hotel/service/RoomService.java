package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.enums.RoomStatus;
import br.com.stivenshotel.stivens_hotel.model.Room;
import br.com.stivenshotel.stivens_hotel.model.RoomType;
import br.com.stivenshotel.stivens_hotel.repository.RoomRepository;
import br.com.stivenshotel.stivens_hotel.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;

    public RoomService(RoomRepository roomRepository, RoomTypeRepository roomTypeRepository) {
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
    }


    @Transactional
    public Room create(Room room) {
        if (roomRepository.findByNumber(room.getNumber()).isPresent()) {
            throw new RuntimeException("Room with number " + room.getNumber() + " already exists.");
        }

        // Confere se o tipo de quarto existe
        RoomType roomType = roomTypeRepository.findById(room.getRoomType().getId())
                .orElseThrow(() -> new RuntimeException("RoomType not found"));

        // Define o status inicial para qualquer novo quarto
        room.setStatus(RoomStatus.AVAILABLE);

        // Define o tipo de quarto completo
        room.setRoomType(roomType);

        return roomRepository.save(room);
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Room findById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found by id: " + id));
    }

    @Transactional
    public Room update(Long id, Room roomDetails) {
        Room existingRoom = findById(id);

        // Confere se o tipo de quarto existe
        RoomType roomType = roomTypeRepository.findById(roomDetails.getRoomType().getId())
                .orElseThrow(() -> new RuntimeException("RoomType not found"));

        existingRoom.setNumber(roomDetails.getNumber());
        existingRoom.setFloor(roomDetails.getFloor());
        existingRoom.setStatus(roomDetails.getStatus());
        existingRoom.setRoomType(roomType);

        return roomRepository.save(existingRoom);
    }

    public void delete(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        room.ifPresent(roomRepository::delete);
    }
}
