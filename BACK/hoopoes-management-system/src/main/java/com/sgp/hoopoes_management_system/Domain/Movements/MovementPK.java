package com.sgp.hoopoes_management_system.Domain.Movements;

import java.time.LocalDateTime;

import com.sgp.hoopoes_management_system.Domain.Users.User;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
// import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "movimentacoes")
@Embeddable
public class MovementPK {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimentacao", nullable = false, unique = true)
    private Long id;

    @Column(name = "tipo_movimentacao", nullable = false)
    private String type;

    /*@ManyToOne
    @JoinColumn(name = "id_lote", nullable = false)
    private Batch batchId;*/

    @Column(name = "quantidade_movimentada", nullable = false)
    private int amountMoved;

    @Column(name = "data_movimentacao", nullable = false)
    private LocalDateTime dateMoved;

    @ManyToMany
    @JoinColumn(name = "id_usuario", nullable = false)
    private User userId;
}