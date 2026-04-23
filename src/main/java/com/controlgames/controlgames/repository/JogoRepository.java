package com.controlgames.controlgames.repository;

import com.controlgames.controlgames.model.JogoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JogoRepository extends JpaRepository<JogoEntity, Integer> {
}
