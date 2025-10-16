package br.com.stivenshotel.stivens_hotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "guests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode ser vazio.")
    @Size(min = 3, max = 100, message = "O nome completo deve ter entre 3 e 100 caracteres.")
    @Column(nullable = false)
    private String fullName;

    @NotBlank(message = "O CPF não pode ser vazio.")
    @Pattern(regexp = "\\d{11}", message = "O CPF deve conter 11 dígitos.")
    @Column(nullable = false, unique = true)
    private String cpf;

    @Size(max = 20, message = "O telefone não pode ter mais de 20 caracteres.")
    private String phone;

    @Email(message = "O formato do email é inválido.")
    @NotBlank(message = "O email não pode ser vazio.")
    @Column(unique = true)
    private String email;
}
