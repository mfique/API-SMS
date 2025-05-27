package sms.example.SMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sms.example.SMS.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
} 