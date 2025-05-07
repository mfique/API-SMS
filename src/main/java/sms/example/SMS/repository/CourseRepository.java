package sms.example.SMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sms.example.SMS.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
} 