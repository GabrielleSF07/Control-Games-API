package com.controlgames.controlgames.controller;

import com.controlgames.controlgames.dto.LoginRequest;
import com.controlgames.controlgames.model.DesenvolvedorEntity;
import com.controlgames.controlgames.service.DesenvolvedorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/desenvolvedores")
@CrossOrigin(origins = "*")
public class DesenvolvedorController {

    private final DesenvolvedorService desenvolvedorService;

    public DesenvolvedorController(DesenvolvedorService desenvolvedorService) {
        this.desenvolvedorService = desenvolvedorService;
    }

    @GetMapping
    public List<DesenvolvedorEntity> listarTodos() {
        return desenvolvedorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<DesenvolvedorEntity> buscarPorId(@PathVariable Integer id) {
        return desenvolvedorService.buscarPorId(id);
    }

    @PostMapping
    public DesenvolvedorEntity salvar(@RequestBody DesenvolvedorEntity desenvolvedor) {
        return desenvolvedorService.salvar(desenvolvedor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        desenvolvedorService.deletar(id);
    }

    @PostMapping("/login")
    public DesenvolvedorEntity login(@RequestBody LoginRequest request) {
        return desenvolvedorService.autenticar(request.getEmail(), request.getSenha());
    }
}