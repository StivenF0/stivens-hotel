package br.com.stivenshotel.stivens_hotel.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "room_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode ser vazio.")
    @Column(nullable = false)
    private String name;

    private String description;

    @Min(value = 0, message = "O valor não pode ser negativo.")
    @Column(nullable = false)
    private BigDecimal dailyPrice;
}
