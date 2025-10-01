package br.com.stivenshotel.stivens_hotel.controller;

import br.com.stivenshotel.stivens_hotel.model.RoomType;
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
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeService.findAll();
        return ResponseEntity.ok(roomTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable Long id) {
        RoomType roomType = roomTypeService.findById(id);
        return ResponseEntity.ok(roomType);
    }

    @PostMapping
    public ResponseEntity<RoomType> createRoomType(@Valid @RequestBody RoomType roomType) {
        RoomType newRoomType = roomTypeService.create(roomType);
        return new ResponseEntity<>(newRoomType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomType> updateRoomType(@PathVariable Long id, @Valid @RequestBody RoomType roomTypeDetails) {
        RoomType updatedRoomType = roomTypeService.update(id, roomTypeDetails);
        return ResponseEntity.ok(updatedRoomType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomType(@PathVariable Long id) {
        roomTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
