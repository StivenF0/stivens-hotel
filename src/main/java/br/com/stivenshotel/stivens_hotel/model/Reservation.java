package br.com.stivenshotel.stivens_hotel.model;

import br.com.stivenshotel.stivens_hotel.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate checkInDate;

    @Column(nullable = false)
    private LocalDate checkOutDate;

    private BigDecimal totalValue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

    // --- Relacionamentos ---
    // Muitas Reservas (Reservation) podem pertencer a Um Hóspede (Guest)
    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = false)
    private Guest guest;

    // Muitas Reservas (Reservation) podem ser feitas para Um Quarto (Room)
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
}
