package com.controlgames.controlgames.service;

import com.controlgames.controlgames.model.CompraEntity;
import com.controlgames.controlgames.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    public List<CompraEntity> listarTodos() {
        return compraRepository.findAll();
    }

    public Optional<CompraEntity> buscarPorId(Integer id) {
        return compraRepository.findById(id);
    }

    public CompraEntity salvar(CompraEntity compra) {
        return compraRepository.save(compra);
    }

    public void deletar(Integer id) {
        compraRepository.deleteById(id);
    }
}
