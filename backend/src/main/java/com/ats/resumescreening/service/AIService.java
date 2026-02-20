package com.ats.resumescreening.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String analyzeResume(String resumeText, String jobDescription) {
        String prompt = String.format(
            "Analyze the following resume against the job description. Provide the result in JSON format with fields: " +
            "matchPercentage (number), matchedSkills (string), missingSkills (string), improvementSuggestions (string), " +
            "learningResources (string), and status (one of: Recommended, Under Review, Not Matching).\n\n" +
            "RESUME:\n%s\n\nJOB DESCRIPTION:\n%s",
            resumeText, jobDescription
        );

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            content.put("parts", List.of(part));
            requestBody.put("contents", List.of(content));

            String url = apiUrl + "?key=" + apiKey;
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            String response = restTemplate.postForObject(url, entity, String.class);
            return extractJsonFromResponse(response);
        } catch (Exception e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }

    private String extractJsonFromResponse(String response) {
        try {
            JsonNode root = objectMapper.readTree(response);
            String text = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            // Clean up backticks if any
            if (text.contains("```json")) {
                text = text.split("```json")[1].split("```")[0];
            } else if (text.contains("```")) {
                text = text.split("```")[1].split("```")[0];
            }
            return text.trim();
        } catch (Exception e) {
            return "{\"error\": \"Failed to parse AI response\"}";
        }
    }
}
