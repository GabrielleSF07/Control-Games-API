package com.controlgames.controlgames.repository;

import com.controlgames.controlgames.model.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<ClienteEntity, Integer> {
    ClienteEntity findByEmail(String email);
}