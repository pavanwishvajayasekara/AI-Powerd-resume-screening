package com.ats.resumescreening.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private com.ats.resumescreening.repository.SettingRepository settingRepository;

    @Value("${gemini.api.key}")
    private String defaultGeminiApiKey;

    @Value("${gemini.api.url}")
    private String defaultGeminiApiUrl;

    @Value("${cohere.api.key}")
    private String defaultCohereApiKey;

    @Value("${cohere.api.url}")
    private String defaultCohereApiUrl;

    @Value("${ai.provider:gemini}")
    private String defaultAiProvider;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private String getSetting(String key, String defaultValue) {
        return settingRepository.findById(key)
                .map(com.ats.resumescreening.model.AppSetting::getConfigValue)
                .orElse(defaultValue);
    }

    public String analyzeResume(String resumeText, String jobDescription) {
        String provider = getSetting("ai.provider", defaultAiProvider);

        if ("cohere".equalsIgnoreCase(provider)) {
            return analyzeWithCohere(resumeText, jobDescription);
        } else if ("huggingface".equalsIgnoreCase(provider)) {
            return analyzeWithHuggingFace(resumeText, jobDescription);
        }
        return analyzeWithGemini(resumeText, jobDescription);
    }

    private String getPrompt(String resumeText, String jobDescription) {
        return String.format(
            "Analyze the following resume against the job description. " +
            "Crucially, return ONLY a valid JSON object. Do not include any markdown formatting like ```json, any preamble, or any conversational text. " +
            "The JSON must have these exact fields: " +
            "\"matchPercentage\" (number), " +
            "\"matchedSkills\" (string - provide a comma-separated list of technical/soft skills matched), " +
            "\"missingSkills\" (string - provide a comma-separated list of critical missing skills), " +
            "\"improvementSuggestions\" (string - actionable advice), " +
            "\"learningResources\" (string - provide a structured career roadmap with course names and their direct clickable URLs like https://coursera.org/... ), " +
            "\"status\" (one of: Recommended, Under Review, Not Matching).\n\n" +
            "RESUME:\n%s\n\nJOB DESCRIPTION:\n%s",
            resumeText, jobDescription
        );
    }

    private String analyzeWithGemini(String resumeText, String jobDescription) {
        String apiKey = getSetting("gemini.key", defaultGeminiApiKey);
        String apiUrl = getSetting("gemini.url", defaultGeminiApiUrl);
        String prompt = getPrompt(resumeText, jobDescription);

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
            return generateErrorJson(e.getMessage());
        }
    }

    private String analyzeWithCohere(String resumeText, String jobDescription) {
        String apiKey = getSetting("cohere.key", defaultCohereApiKey);
        String apiUrl = getSetting("cohere.url", defaultCohereApiUrl);
        String prompt = getPrompt(resumeText, jobDescription);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("message", prompt);
            requestBody.put("model", "command-r-08-2024");

            Map<String, String> responseFormat = new HashMap<>();
            responseFormat.put("type", "json_object");
            requestBody.put("response_format", responseFormat);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            String response = restTemplate.postForObject(apiUrl, entity, String.class);

            JsonNode root = objectMapper.readTree(response);
            return root.path("text").asText().trim();
        } catch (Exception e) {
            return generateErrorJson(e.getMessage());
        }
    }

    private String analyzeWithHuggingFace(String resumeText, String jobDescription) {
        String apiKey = getSetting("huggingface.key", System.getenv("COHERE_API_KEY")); // fallback
        String model = getSetting("huggingface.model", "meta-llama/Llama-3.2-3B-Instruct");
        String apiUrl = "https://router.huggingface.co/v1/chat/completions";
        String prompt = getPrompt(resumeText, jobDescription);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);

            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);
            requestBody.put("messages", List.of(message));
            requestBody.put("max_tokens", 1024);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            String response = restTemplate.postForObject(apiUrl, entity, String.class);

            JsonNode root = objectMapper.readTree(response);
            String text = root.path("choices").get(0).path("message").path("content").asText().trim();

            return cleanJson(text);
        } catch (Exception e) {
            return generateErrorJson(e.getMessage());
        }
    }

    private String generateErrorJson(String message) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("error", message);
        try {
            return objectMapper.writeValueAsString(errorMap);
        } catch (Exception ex) {
            return "{\"error\": \"AI service failure\"}";
        }
    }

    private String cleanJson(String text) {
        int startIndex = text.indexOf("{");
        int endIndex = text.lastIndexOf("}");
        if (startIndex != -1 && endIndex != -1 && endIndex > startIndex) {
            return text.substring(startIndex, endIndex + 1);
        }
        return text;
    }

    private String extractJsonFromResponse(String response) {
        try {
            JsonNode root = objectMapper.readTree(response);
            String text = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText().trim();
            return cleanJson(text);
        } catch (Exception e) {
            return "{\"error\": \"Failed to parse AI response\"}";
        }
    }
}
