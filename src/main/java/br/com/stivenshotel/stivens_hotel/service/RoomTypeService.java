package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeResponseDTO;
import br.com.stivenshotel.stivens_hotel.model.RoomType;
import br.com.stivenshotel.stivens_hotel.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<RoomTypeResponseDTO> findAll() {
        return roomTypeRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public RoomTypeResponseDTO findById(Long id) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RoomType not found by id: " + id));
        return toResponseDTO(roomType);
    }

    public RoomTypeResponseDTO create(RoomTypeRequestDTO dto) {
        RoomType roomType = toEntity(dto);
        RoomType savedRoomType = roomTypeRepository.save(roomType);
        return toResponseDTO(savedRoomType);
    }

    public RoomTypeResponseDTO update(Long id, RoomTypeRequestDTO dto) {
        RoomType existingRoomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RoomType not found by id: " + id));

        updateEntityFromDTO(existingRoomType, dto);
        RoomType savedRoomType = roomTypeRepository.save(existingRoomType);
        return toResponseDTO(savedRoomType);
    }

    public void delete(Long id) {
        if (!roomTypeRepository.existsById(id)) {
            throw new RuntimeException("RoomType not found by id: " + id);
        }
        roomTypeRepository.deleteById(id);
    }

    private RoomType toEntity(RoomTypeRequestDTO dto) {
        RoomType roomType = new RoomType();
        updateEntityFromDTO(roomType, dto);
        return roomType;
    }

    private void updateEntityFromDTO(RoomType roomType, RoomTypeRequestDTO dto) {
        roomType.setName(dto.name());
        roomType.setDescription(dto.description());
        roomType.setDailyPrice(dto.dailyPrice());
    }

    private RoomTypeResponseDTO toResponseDTO(RoomType entity) {
        return new RoomTypeResponseDTO(
            entity.getId(),
            entity.getName(),
            entity.getDescription(),
            entity.getDailyPrice()
        );
    }
}
