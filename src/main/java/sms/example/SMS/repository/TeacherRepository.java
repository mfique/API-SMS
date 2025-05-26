package sms.example.SMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sms.example.SMS.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}