package br.com.stivenshotel.stivens_hotel.config;

import br.com.stivenshotel.stivens_hotel.enums.Role;
import br.com.stivenshotel.stivens_hotel.model.User;
import br.com.stivenshotel.stivens_hotel.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByName("admin").isEmpty()) {
            System.out.println("No admin user found, creating one...");

            User adminUser = new User();
            adminUser.setName("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setRole(Role.ADMIN);

            userRepository.save(adminUser);
            System.out.println("Admin user created successfully!");
        } else {
            System.out.println("Admin user already exists.");
        }
    }
}
