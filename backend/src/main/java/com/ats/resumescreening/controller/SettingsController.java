package com.ats.resumescreening.controller;

import com.ats.resumescreening.model.AppSetting;
import com.ats.resumescreening.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingRepository settingRepository;

    @GetMapping
    public ResponseEntity<Map<String, String>> getSettings() {
        Map<String, String> settings = settingRepository.findAll().stream()
                .collect(Collectors.toMap(AppSetting::getConfigKey, AppSetting::getConfigValue));
        return ResponseEntity.ok(settings);
    }

    @PostMapping
    public ResponseEntity<String> saveSettings(@RequestBody Map<String, String> settings) {
        settings.forEach((key, value) -> {
            settingRepository.save(new AppSetting(key, value));
        });
        return ResponseEntity.ok("Settings saved successfully");
    }
}
