package com.controlgames.controlgames.repository;

import com.controlgames.controlgames.model.DesenvolvedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesenvolvedorRepository extends JpaRepository<DesenvolvedorEntity, Integer> {
    DesenvolvedorEntity findByEmail(String email);
}