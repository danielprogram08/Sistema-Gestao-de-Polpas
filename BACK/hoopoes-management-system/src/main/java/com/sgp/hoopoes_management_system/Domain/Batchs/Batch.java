package com.sgp.hoopoes_management_system.Domain.Batchs;

import java.util.Date;

import com.sgp.hoopoes_management_system.Domain.Products.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "lotes")
@Embeddable
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lote", nullable = false, unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Product productId;

    @Column(name = "n_lote", nullable = false)
    private String nBatch;

    @Column(name = "data_fabricacao", nullable = false)
    private Date dateOfProduction;

    @Column(name = "data_validade", nullable = false)
    private Date dateOfExpiration;

    @Column(name = "qtd_inicial", nullable = false)
    private int initialQuantity;

    @Column(name = "qtd_atual", nullable = false)
    private int currentQuantity;
}