package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.model.RoomType;
import br.com.stivenshotel.stivens_hotel.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<RoomType> findAll() {
        return roomTypeRepository.findAll();
    }

    public RoomType findById(Long id) {
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RoomType not found by id: " + id));
    }

    public RoomType create(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public RoomType update(Long id, RoomType roomTypeDetails) {
        Optional<RoomType> optionalRoomType = roomTypeRepository.findById(id);
        if (!optionalRoomType.isPresent()) {
            throw new RuntimeException("RoomType not found by id: " + id);
        }

        RoomType roomType = optionalRoomType.get();
        roomType.setName(roomTypeDetails.getName());
        roomType.setDescription(roomTypeDetails.getDescription());
        roomType.setDailyPrice(roomTypeDetails.getDailyPrice());

        return roomTypeRepository.save(roomType);
    }

    public void delete(Long id) {
        Optional<RoomType> roomType = roomTypeRepository.findById(id);
        roomType.ifPresent(roomTypeRepository::delete);
    }
}
