package br.com.stivenshotel.stivens_hotel.controller;

import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.roomtype.RoomTypeResponseDTO;
import br.com.stivenshotel.stivens_hotel.service.RoomTypeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {
    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping
    public ResponseEntity<List<RoomTypeResponseDTO>> getAllRoomTypes() {
        List<RoomTypeResponseDTO> roomTypes = roomTypeService.findAll();
        return ResponseEntity.ok(roomTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomTypeResponseDTO> getRoomTypeById(@PathVariable Long id) {
        RoomTypeResponseDTO roomType = roomTypeService.findById(id);
        return ResponseEntity.ok(roomType);
    }

    @PostMapping
    public ResponseEntity<RoomTypeResponseDTO> createRoomType(@Valid @RequestBody RoomTypeRequestDTO roomTypeRequest) {
        RoomTypeResponseDTO newRoomType = roomTypeService.create(roomTypeRequest);
        return new ResponseEntity<>(newRoomType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomTypeResponseDTO> updateRoomType(
            @PathVariable Long id,
            @Valid @RequestBody RoomTypeRequestDTO roomTypeRequest) {
        RoomTypeResponseDTO updatedRoomType = roomTypeService.update(id, roomTypeRequest);
        return ResponseEntity.ok(updatedRoomType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomType(@PathVariable Long id) {
        roomTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
