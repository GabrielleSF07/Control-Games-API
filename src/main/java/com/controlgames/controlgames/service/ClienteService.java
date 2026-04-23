package com.controlgames.controlgames.service;

import com.controlgames.controlgames.model.ClienteEntity;
import com.controlgames.controlgames.repository.ClienteRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<ClienteEntity> listarTodos() {
        return clienteRepository.findAll();
    }

    public Optional<ClienteEntity> buscarPorId(Integer id) {
        return clienteRepository.findById(id);
    }

    public ClienteEntity salvar(ClienteEntity cliente) {
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        return clienteRepository.save(cliente);
    }

    public void deletar(Integer id) {
        clienteRepository.deleteById(id);
    }

    public ClienteEntity autenticar(String email, String senhaDigitada) {
        ClienteEntity cliente = clienteRepository.findByEmail(email);

        if (cliente == null) {
            return null;
        }

        String senhaSalva = cliente.getSenha();

        if (senhaSalva.startsWith("$2a$") || senhaSalva.startsWith("$2b$") || senhaSalva.startsWith("$2y$")) {
            if (passwordEncoder.matches(senhaDigitada, senhaSalva)) {
                return cliente;
            }
        }

        else {
            if (senhaDigitada.equals(senhaSalva)) {
                cliente.setSenha(passwordEncoder.encode(senhaDigitada));
                clienteRepository.save(cliente);
                return cliente;
            }
        }

        return null;
    }
}