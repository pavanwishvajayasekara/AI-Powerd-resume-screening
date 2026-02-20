package com.ats.resumescreening.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "candidates")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String position;
    
    @Column(columnDefinition = "TEXT")
    private String resumeText;
    
    @Column(columnDefinition = "TEXT")
    private String jobDescription;
    
    private Integer matchPercentage;
    
    @Column(columnDefinition = "TEXT")
    private String matchedSkills;
    
    @Column(columnDefinition = "TEXT")
    private String missingSkills;
    
    @Column(columnDefinition = "TEXT")
    private String improvementSuggestions;
    
    @Column(columnDefinition = "TEXT")
    private String learningResources;
    
    private String status; // e.g., "Recommended", "Under Review", "Not Matching"
    
    private LocalDateTime processedAt;

    @PrePersist
    protected void onCreate() {
        processedAt = LocalDateTime.now();
    }
}
