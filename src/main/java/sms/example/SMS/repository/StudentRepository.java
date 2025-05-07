package sms.example.SMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sms.example.SMS.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
} 