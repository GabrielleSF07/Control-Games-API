package com.controlgames.controlgames.controller;

import com.controlgames.controlgames.model.JogoEntity;
import com.controlgames.controlgames.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jogos")
@CrossOrigin(origins = "*")
public class JogoController {

    @Autowired
    private JogoService jogoService;

    @GetMapping
    public List<JogoEntity> listarTodos() {
        return jogoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<JogoEntity> buscarPorId(@PathVariable Integer id) {
        return jogoService.buscarPorId(id);
    }

    @PostMapping
    public JogoEntity salvar(@RequestBody JogoEntity jogo) {
        return jogoService.salvar(jogo);
    }

    @PutMapping("/{id}")
    public JogoEntity atualizar(@PathVariable Integer id, @RequestBody JogoEntity jogo) {
        jogo.setId(id);
        return jogoService.salvar(jogo);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        jogoService.deletar(id);
    }
}
