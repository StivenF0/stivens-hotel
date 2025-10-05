package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.model.Guest;
import br.com.stivenshotel.stivens_hotel.model.User;
import br.com.stivenshotel.stivens_hotel.repository.GuestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestService {
    private final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<Guest> findAll() {
        return guestRepository.findAll();
    }

    public Guest findById(Long id) {
        return guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest not found by id: " + id));
    }

    public Guest update(Long id, Guest guestDetails) {
        Optional<Guest> optionalGuest = guestRepository.findById(id);
        if (!optionalGuest.isPresent()) {
            throw new RuntimeException("Guest not found by id: " + id);
        }

        Guest guest = optionalGuest.get();
        guest.setFullName(guestDetails.getFullName());
        guest.setCpf(guestDetails.getCpf());
        guest.setEmail(guest.getEmail());
        guest.setPhone(guest.getPhone());

        return guestRepository.save(guest);
    }

    public Guest create(Guest guest) {
        return guestRepository.save(guest);
    }

    public void delete(Long id) {
        Optional<Guest> guest = guestRepository.findById(id);
        guest.ifPresent(guestRepository::delete);
    }
}
