package com.controlgames.controlgames.controller;

import com.controlgames.controlgames.model.CompraEntity;
import com.controlgames.controlgames.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @GetMapping
    public List<CompraEntity> listarTodos() {
        return compraService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<CompraEntity> buscarPorId(@PathVariable Integer id) {
        return compraService.buscarPorId(id);
    }

    @PostMapping
    public CompraEntity salvar(@RequestBody CompraEntity compra) {
        return compraService.salvar(compra);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        compraService.deletar(id);
    }
}
