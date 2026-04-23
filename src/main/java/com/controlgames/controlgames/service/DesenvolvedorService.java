package com.controlgames.controlgames.service;

import com.controlgames.controlgames.model.DesenvolvedorEntity;
import com.controlgames.controlgames.repository.DesenvolvedorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesenvolvedorService {

    private final DesenvolvedorRepository desenvolvedorRepository;
    private final PasswordEncoder passwordEncoder;

    public DesenvolvedorService(DesenvolvedorRepository desenvolvedorRepository, PasswordEncoder passwordEncoder) {
        this.desenvolvedorRepository = desenvolvedorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<DesenvolvedorEntity> listarTodos() {
        return desenvolvedorRepository.findAll();
    }

    public Optional<DesenvolvedorEntity> buscarPorId(Integer id) {
        return desenvolvedorRepository.findById(id);
    }

    public DesenvolvedorEntity salvar(DesenvolvedorEntity desenvolvedor) {
        desenvolvedor.setSenha(passwordEncoder.encode(desenvolvedor.getSenha()));
        return desenvolvedorRepository.save(desenvolvedor);
    }

    public void deletar(Integer id) {
        desenvolvedorRepository.deleteById(id);
    }

    public DesenvolvedorEntity autenticar(String email, String senhaDigitada) {
        DesenvolvedorEntity desenvolvedor = desenvolvedorRepository.findByEmail(email);

        if (desenvolvedor == null) {
            return null;
        }

        String senhaSalva = desenvolvedor.getSenha();

        if (senhaSalva.startsWith("$2a$") || senhaSalva.startsWith("$2b$") || senhaSalva.startsWith("$2y$")) {
            if (passwordEncoder.matches(senhaDigitada, senhaSalva)) {
                return desenvolvedor;
            }
        } else {
            if (senhaDigitada.equals(senhaSalva)) {
                desenvolvedor.setSenha(passwordEncoder.encode(senhaDigitada));
                desenvolvedorRepository.save(desenvolvedor);
                return desenvolvedor;
            }
        }

        return null;
    }
}