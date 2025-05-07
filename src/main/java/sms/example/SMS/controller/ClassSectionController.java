package sms.example.SMS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sms.example.SMS.entity.ClassSection;
import sms.example.SMS.repository.ClassSectionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class ClassSectionController {

    @Autowired
    private ClassSectionRepository classSectionRepository;

    @GetMapping
    public Page<ClassSection> getAllSections(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return classSectionRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassSection> getSectionById(@PathVariable Long id) {
        return classSectionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ClassSection createSection(@RequestBody ClassSection section) {
        return classSectionRepository.save(section);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassSection> updateSection(@PathVariable Long id, @RequestBody ClassSection sectionDetails) {
        return classSectionRepository.findById(id)
                .map(existingSection -> {
                    existingSection.setSectionName(sectionDetails.getSectionName());
                    existingSection.setGrade(sectionDetails.getGrade());
                    existingSection.setAcademicYear(sectionDetails.getAcademicYear());
                    existingSection.setStudents(sectionDetails.getStudents());
                    existingSection.setCourses(sectionDetails.getCourses());
                    return ResponseEntity.ok(classSectionRepository.save(existingSection));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSection(@PathVariable Long id) {
        return classSectionRepository.findById(id)
                .map(section -> {
                    classSectionRepository.delete(section);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 