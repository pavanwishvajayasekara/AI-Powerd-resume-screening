package com.ats.resumescreening.repository;

import com.ats.resumescreening.model.AppSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<AppSetting, String> {
}
