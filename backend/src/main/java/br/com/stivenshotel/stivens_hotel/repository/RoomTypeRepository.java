package br.com.stivenshotel.stivens_hotel.repository;

import br.com.stivenshotel.stivens_hotel.model.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
    // save, findById, findAll, deleteById
}
