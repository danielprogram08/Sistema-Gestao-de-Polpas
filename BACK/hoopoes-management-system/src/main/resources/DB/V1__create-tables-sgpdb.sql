CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario BIGSERIAL PRIMARY KEY,
    login VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
    id_produto BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    unidade_medida VARCHAR(20) NOT NULL,
    estoque_minimo INT NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lotes (
    id_lote BIGSERIAL PRIMARY KEY,
    id_produto BIGINT NOT NULL,
    n_lote VARCHAR(50) NOT NULL,
    data_fabricacao DATE NOT NULL,
    data_validade DATE NOT NULL,
    qtd_inicial INT NOT NULL,
    qtd_atual INT NOT NULL,
    CONSTRAINT fk_lotes_produtos FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS vendas (
    id_venda BIGSERIAL PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    data_hora_venda TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    forma_pagamento TEXT NOT NULL,
    total_venda DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_vendas_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS itens_venda (
    id_item_venda BIGSERIAL PRIMARY KEY,
    id_venda BIGINT NOT NULL,
    id_lote BIGINT NOT NULL,
    qtd_vendida INTEGER NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_itens_venda_vendas FOREIGN KEY (id_venda) REFERENCES vendas(id_venda) ON DELETE CASCADE,
    CONSTRAINT fk_itens_venda_lotes FOREIGN KEY (id_lote) REFERENCES lotes(id_lote) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS movimentacoes (
    id_movimentacao BIGSERIAL PRIMARY KEY,
    tipo_movimentacao TEXT NOT NULL,
    id_lote BIGINT NOT NULL,
    qtd_movimentada INT NOT NULL,
    data_movimentacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario BIGINT NOT NULL,
    CONSTRAINT fk_movimentacoes_lotes FOREIGN KEY (id_lote) REFERENCES lotes(id_lote) ON DELETE RESTRICT,
    CONSTRAINT fk_movimentacoes_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
);