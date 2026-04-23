package com.controlgames.controlgames.service;

import com.controlgames.controlgames.model.JogoEntity;
import com.controlgames.controlgames.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    public List<JogoEntity> listarTodos() {
        return jogoRepository.findAll();
    }

    public Optional<JogoEntity> buscarPorId(Integer id) {
        return jogoRepository.findById(id);
    }

    public JogoEntity salvar(JogoEntity jogo) {
        return jogoRepository.save(jogo);
    }

    public void deletar(Integer id) {
        jogoRepository.deleteById(id);
    }
}