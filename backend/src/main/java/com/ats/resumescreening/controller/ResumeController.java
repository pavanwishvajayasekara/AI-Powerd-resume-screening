package com.ats.resumescreening.controller;

import com.ats.resumescreening.model.Candidate;
import com.ats.resumescreening.repository.CandidateRepository;
import com.ats.resumescreening.service.AIService;
import com.ats.resumescreening.service.ResumeParserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development convenience
public class ResumeController {

    @Autowired
    private ResumeParserService parserService;

    @Autowired
    private AIService aiService;

    @Autowired
    private CandidateRepository candidateRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription) {
        try {
            String resumeText = parserService.parseResume(file);
            String aiResponseJson = aiService.analyzeResume(resumeText, jobDescription);

            JsonNode root = objectMapper.readTree(aiResponseJson);
            
            // Optional: check AI service error
            if (root.has("error")) {
                return ResponseEntity.badRequest().body("AI Service Error: " + root.path("error").asText());
            }

            Candidate candidate = new Candidate();
            candidate.setName(file.getOriginalFilename()); // Fallback name
            candidate.setResumeText(resumeText);
            candidate.setJobDescription(jobDescription);
            candidate.setMatchPercentage(root.path("matchPercentage").asInt());
            candidate.setMatchedSkills(root.path("matchedSkills").asText());
            candidate.setMissingSkills(root.path("missingSkills").asText());
            candidate.setImprovementSuggestions(root.path("improvementSuggestions").asText());
            candidate.setLearningResources(root.path("learningResources").asText());
            candidate.setStatus(root.path("status").asText());
            
            candidateRepository.save(candidate);
            
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("System Error: " + e.getMessage());
        }
    }

    @GetMapping("/candidates")
    public List<Candidate> getCandidates() {
        return candidateRepository.findAll();
    }
}
