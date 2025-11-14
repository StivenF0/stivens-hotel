package br.com.stivenshotel.stivens_hotel.service;

import br.com.stivenshotel.stivens_hotel.dto.user.UserRequestDTO;
import br.com.stivenshotel.stivens_hotel.dto.user.UserResponseDTO;
import br.com.stivenshotel.stivens_hotel.model.User;
import br.com.stivenshotel.stivens_hotel.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO create(UserRequestDTO userRequest) {
        if (userRepository.findByName(userRequest.name()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        updateUserFromDTO(user, userRequest);
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        
        User savedUser = userRepository.save(user);
        return toUserResponseDTO(savedUser);
    }

    public List<UserResponseDTO> findAll() {
        return userRepository.findAll().stream()
                .map(this::toUserResponseDTO)
                .toList();
    }

    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toUserResponseDTO(user);
    }

    public UserResponseDTO update(Long id, UserRequestDTO userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        updateUserFromDTO(user, userDetails);
        if (userDetails.password() != null && !userDetails.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.password()));
        }

        User updatedUser = userRepository.save(user);
        return toUserResponseDTO(updatedUser);
    }

    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    private void updateUserFromDTO(User user, UserRequestDTO dto) {
        user.setName(dto.name());
        user.setRole(dto.role());
    }

    private UserResponseDTO toUserResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getRole()
        );
    }
}