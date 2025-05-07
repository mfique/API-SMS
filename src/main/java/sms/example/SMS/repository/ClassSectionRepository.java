package sms.example.SMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sms.example.SMS.entity.ClassSection;

public interface ClassSectionRepository extends JpaRepository<ClassSection, Long> {
} 