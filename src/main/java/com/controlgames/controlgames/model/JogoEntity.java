package com.controlgames.controlgames.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "jogos")
public class JogoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "desenvolvedora_id")
    private DesenvolvedorEntity desenvolvedora;

    private String nome;
    private String descricao;
    private String categoria;

    @Column(name = "faixa_etaria")
    private String faixaEtaria;

    private Double valor;

    @Column(name = "quantidadeVendida")
    private Integer quantidadeVendida;

    @Column(name = "data_lancamento")
    private LocalDate dataLancamento;

    private String imagem;
}
