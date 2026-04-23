package com.controlgames.controlgames.controller;

import com.controlgames.controlgames.dto.LoginRequest;
import com.controlgames.controlgames.model.ClienteEntity;
import com.controlgames.controlgames.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<ClienteEntity> listarTodos() {
        return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<ClienteEntity> buscarPorId(@PathVariable Integer id) {
        return clienteService.buscarPorId(id);
    }

    @PostMapping
    public ClienteEntity salvar(@RequestBody ClienteEntity cliente) {
        return clienteService.salvar(cliente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        clienteService.deletar(id);
    }

    @PostMapping("/login")
    public ClienteEntity login(@RequestBody LoginRequest request) {
        return clienteService.autenticar(request.getEmail(), request.getSenha());
    }
}
