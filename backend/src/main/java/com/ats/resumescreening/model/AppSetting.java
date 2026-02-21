package com.ats.resumescreening.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "settings")
public class AppSetting {
    @Id
    private String configKey; // e.g., "ai.provider", "gemini.key", "cohere.key", "huggingface.key"
    
    @Column(columnDefinition = "TEXT")
    private String configValue;

    public AppSetting() {}

    public AppSetting(String configKey, String configValue) {
        this.configKey = configKey;
        this.configValue = configValue;
    }
}
