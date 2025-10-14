package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.dto.guest.GuestRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.guest.GuestResponseDTO;
import br.com.stivenshotel.stivens_hotel.model.Guest;
import br.com.stivenshotel.stivens_hotel.repository.GuestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {
    private final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<GuestResponseDTO> findAll() {
        return guestRepository.findAll().stream()
                .map(this::toGuestResponseDTO)
                .toList();
    }

    public GuestResponseDTO findById(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest not found by id: " + id));
        return toGuestResponseDTO(guest);
    }

    public GuestResponseDTO update(Long id, GuestRequestDTO guestDetails) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest not found by id: " + id));

        updateGuestFromDTO(guest, guestDetails);
        Guest updatedGuest = guestRepository.save(guest);
        return toGuestResponseDTO(updatedGuest);
    }

    public GuestResponseDTO create(GuestRequestDTO guestRequest) {
        Guest guest = new Guest();
        updateGuestFromDTO(guest, guestRequest);
        Guest savedGuest = guestRepository.save(guest);
        return toGuestResponseDTO(savedGuest);
    }

    public void delete(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest not found by id: " + id));
        guestRepository.delete(guest);
    }

    private void updateGuestFromDTO(Guest guest, GuestRequestDTO dto) {
        guest.setFullName(dto.fullName());
        guest.setCpf(dto.cpf());
        guest.setEmail(dto.email());
        guest.setPhone(dto.phone());
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
}
