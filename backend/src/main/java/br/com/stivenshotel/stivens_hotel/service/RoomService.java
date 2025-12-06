package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.dto.room.RoomRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.room.RoomResponseDTO;
import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeResponseDTO;
import br.com.stivenshotel.stivens_hotel.model.Room;
import br.com.stivenshotel.stivens_hotel.model.RoomType;
import br.com.stivenshotel.stivens_hotel.repository.RoomRepository;
import br.com.stivenshotel.stivens_hotel.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;

    public RoomService(RoomRepository roomRepository, RoomTypeRepository roomTypeRepository) {
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
    }

    @Transactional
    public RoomResponseDTO create(RoomRequestDTO roomRequest) {
        if (roomRepository.findByNumber(roomRequest.number()).isPresent()) {
            throw new RuntimeException("Room with number " + roomRequest.number() + " already exists.");
        }

        RoomType roomType = roomTypeRepository.findById(roomRequest.roomTypeId())
                .orElseThrow(() -> new RuntimeException("RoomType not found"));

        Room room = new Room();
        updateRoomFromDTO(room, roomRequest, roomType);

        Room savedRoom = roomRepository.save(room);
        return toRoomResponseDTO(savedRoom);
    }

    public List<RoomResponseDTO> findAll() {
        return roomRepository.findAll().stream()
                .map(this::toRoomResponseDTO)
                .toList();
    }

    public RoomResponseDTO findById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found by id: " + id));
        return toRoomResponseDTO(room);
    }

    @Transactional
    public RoomResponseDTO update(Long id, RoomRequestDTO roomRequest) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found by id: " + id));

        RoomType roomType = roomTypeRepository.findById(roomRequest.roomTypeId())
                .orElseThrow(() -> new RuntimeException("RoomType not found"));

        updateRoomFromDTO(existingRoom, roomRequest, roomType);
        Room updatedRoom = roomRepository.save(existingRoom);
        return toRoomResponseDTO(updatedRoom);
    }

    public void delete(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found by id: " + id));
        roomRepository.delete(room);
    }

    private void updateRoomFromDTO(Room room, RoomRequestDTO dto, RoomType roomType) {
        room.setNumber(dto.number());
        room.setFloor(dto.floor());
        room.setStatus(dto.status());
        room.setRoomType(roomType);
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
