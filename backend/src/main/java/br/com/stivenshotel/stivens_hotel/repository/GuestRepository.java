package br.com.stivenshotel.stivens_hotel.repository;


import br.com.stivenshotel.stivens_hotel.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    // save, findById, findAll, deleteById
}
