package com.sgp.hoopoes_management_system.Domain.Products;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "produtos")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Long id;

    @Column(name = "nome", nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "categoria", length = 50)
    private String category;

    @Column(name = "unidade_medida", nullable = false, length = 20)
    private String unityMeasure;

    @Column(name = "estoque_minimo", nullable = false)
    private Integer minimumStock;

    @Column(name = "preco_venda", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "ativo", nullable = false)
    private Boolean active = true;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dateRegister;

    @PrePersist
    protected void onCreate() {
        this.dateRegister = LocalDateTime.now();
    }
}
