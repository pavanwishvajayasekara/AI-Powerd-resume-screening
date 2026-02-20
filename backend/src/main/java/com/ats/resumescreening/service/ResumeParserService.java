package com.ats.resumescreening.service;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ResumeParserService {
    private final Tika tika = new Tika();

    public String parseResume(MultipartFile file) throws IOException {
        try {
            return tika.parseToString(file.getInputStream());
        } catch (Exception e) {
            throw new IOException("Failed to parse resume: " + e.getMessage());
        }
    }
}
