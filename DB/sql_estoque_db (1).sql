-- ============================================================================
-- SISTEMA DE ESTOQUE INTELIGENTE PARA MICROEMPRESA DE POLPAS
-- ============================================================================
-- Versão: 1.0
-- SGBD: PostgreSQL 12+
-- Autor: Equipe de Desenvolvimento - UNIFAMETRO
-- Data: Outubro 2025
-- Descrição: Script completo para criação do banco de dados do sistema
--            de controle de estoque com foco em minimizar perdas por 
--            vencimento e facilitar a gestão.
-- ============================================================================

-- ============================================================================
-- 1. CRIAÇÃO DO BANCO DE DADOS
-- ============================================================================

-- Criar o banco de dados (executar como superusuário)
-- CREATE DATABASE estoque_db
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'pt_BR.UTF-8'
--     LC_CTYPE = 'pt_BR.UTF-8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

-- Conectar ao banco de dados
\c estoque_db;

-- ============================================================================
-- 2. CRIAÇÃO DAS TABELAS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tabela: USUARIO
-- Descrição: Armazena os usuários do sistema (gerentes, operadores)
-- ----------------------------------------------------------------------------
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL DEFAULT 'operador' CHECK (perfil IN ('admin', 'gerente', 'operador')),
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_email_formato CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})
);

-- Comentários da tabela
COMMENT ON TABLE usuario IS 'Armazena os usuários do sistema com controle de acesso';
COMMENT ON COLUMN usuario.perfil IS 'Tipos: admin (total acesso), gerente (relatórios), operador (vendas)';
COMMENT ON COLUMN usuario.senha_hash IS 'Hash bcrypt da senha do usuário';

-- ----------------------------------------------------------------------------
-- Tabela: PRODUTO
-- Descrição: Cadastro de produtos (polpas)
-- ----------------------------------------------------------------------------
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    unidade_medida VARCHAR(20) NOT NULL DEFAULT 'kg' CHECK (unidade_medida IN ('kg', 'litro', 'unidade')),
    estoque_minimo INTEGER DEFAULT 0 CHECK (estoque_minimo >= 0),
    preco_venda DECIMAL(10,2) NOT NULL CHECK (preco_venda > 0),
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT uk_produto_nome UNIQUE (nome)
);

-- Comentários da tabela
COMMENT ON TABLE produto IS 'Cadastro de produtos (polpas de frutas)';
COMMENT ON COLUMN produto.estoque_minimo IS 'Quantidade mínima para alertas na tela inicial';
COMMENT ON COLUMN produto.categoria IS 'Exemplos: Tropical, Cítrica, Vermelha, etc.';

-- ----------------------------------------------------------------------------
-- Tabela: LOTE
-- Descrição: Controle de lotes de produtos com validade
-- ----------------------------------------------------------------------------
CREATE TABLE lote (
    id_lote SERIAL PRIMARY KEY,
    id_produto INTEGER NOT NULL,
    numero_lote VARCHAR(50) NOT NULL,
    data_fabricacao DATE,
    data_validade DATE NOT NULL,
    quantidade_inicial INTEGER NOT NULL CHECK (quantidade_inicial > 0),
    quantidade_atual INTEGER NOT NULL CHECK (quantidade_atual >= 0),
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'vencido', 'esgotado')),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_lote_produto FOREIGN KEY (id_produto) 
        REFERENCES produto(id_produto) ON DELETE RESTRICT,
    CONSTRAINT uk_numero_lote UNIQUE (numero_lote, id_produto),
    CONSTRAINT chk_quantidade_valida CHECK (quantidade_atual <= quantidade_inicial),
    CONSTRAINT chk_data_validade CHECK (data_validade >= data_fabricacao OR data_fabricacao IS NULL)
);

-- Comentários da tabela
COMMENT ON TABLE lote IS 'Controle de lotes de produtos por data de validade';
COMMENT ON COLUMN lote.status IS 'ativo: em uso, vencido: passou validade, esgotado: sem estoque';

-- ----------------------------------------------------------------------------
-- Tabela: CLIENTE
-- Descrição: Cadastro de clientes (apenas para pedidos grandes)
-- ----------------------------------------------------------------------------
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    tipo_cliente VARCHAR(20) DEFAULT 'eventual' CHECK (tipo_cliente IN ('eventual', 'frequente')),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    
    CONSTRAINT uk_cliente_telefone UNIQUE (telefone)
);

-- Comentários da tabela
COMMENT ON TABLE cliente IS 'Cadastro simplificado de clientes apenas para pedidos grandes';
COMMENT ON COLUMN cliente.tipo_cliente IS 'eventual: pedido único grande, frequente: pedidos recorrentes';

-- ----------------------------------------------------------------------------
-- Tabela: VENDA
-- Descrição: Registro de vendas realizadas
-- ----------------------------------------------------------------------------
CREATE TABLE venda (
    id_venda SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_cliente INTEGER,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL CHECK (valor_total > 0),
    forma_pagamento VARCHAR(20) NOT NULL CHECK (forma_pagamento IN ('dinheiro', 'pix', 'cartao_debito', 'cartao_credito')),
    status VARCHAR(20) DEFAULT 'concluida' CHECK (status IN ('concluida', 'cancelada')),
    observacao TEXT,
    
    CONSTRAINT fk_venda_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario) ON DELETE RESTRICT,
    CONSTRAINT fk_venda_cliente FOREIGN KEY (id_cliente) 
        REFERENCES cliente(id_cliente) ON DELETE RESTRICT
);

-- Comentários da tabela
COMMENT ON TABLE venda IS 'Registro de todas as vendas realizadas no sistema';
COMMENT ON COLUMN venda.forma_pagamento IS 'Formas: dinheiro, pix, cartao_debito, cartao_credito';
COMMENT ON COLUMN venda.id_cliente IS 'NULL para vendas pequenas, preenchido para pedidos grandes';

-- ----------------------------------------------------------------------------
-- Tabela: ITEM_VENDA
-- Descrição: Itens individuais de cada venda
-- ----------------------------------------------------------------------------
CREATE TABLE item_venda (
    id_item_venda SERIAL PRIMARY KEY,
    id_venda INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    id_lote INTEGER NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10,2) NOT NULL CHECK (preco_unitario > 0),
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal > 0),
    
    CONSTRAINT fk_item_venda_venda FOREIGN KEY (id_venda) 
        REFERENCES venda(id_venda) ON DELETE CASCADE,
    CONSTRAINT fk_item_venda_produto FOREIGN KEY (id_produto) 
        REFERENCES produto(id_produto) ON DELETE RESTRICT,
    CONSTRAINT fk_item_venda_lote FOREIGN KEY (id_lote) 
        REFERENCES lote(id_lote) ON DELETE RESTRICT
);

-- Comentários da tabela
COMMENT ON TABLE item_venda IS 'Itens detalhados de cada venda com rastreamento de lote';
COMMENT ON COLUMN item_venda.subtotal IS 'Calculado automaticamente: quantidade * preco_unitario';

-- ----------------------------------------------------------------------------
-- Tabela: MOVIMENTACAO
-- Descrição: Histórico de entradas e saídas de estoque
-- ----------------------------------------------------------------------------
CREATE TABLE movimentacao (
    id_movimentacao SERIAL PRIMARY KEY,
    id_lote INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('entrada', 'saida', 'ajuste')),
    quantidade INTEGER NOT NULL CHECK (quantidade != 0),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    
    CONSTRAINT fk_movimentacao_lote FOREIGN KEY (id_lote) 
        REFERENCES lote(id_lote) ON DELETE RESTRICT,
    CONSTRAINT fk_movimentacao_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario) ON DELETE RESTRICT
);

-- Comentários da tabela
COMMENT ON TABLE movimentacao IS 'Histórico completo de todas as movimentações de estoque';
COMMENT ON COLUMN movimentacao.tipo IS 'entrada: compra/produção, saida: venda, ajuste: correção';
COMMENT ON COLUMN movimentacao.quantidade IS 'Positivo para entrada, negativo para saída';

-- ----------------------------------------------------------------------------
-- Tabela: PERDA
-- Descrição: Registro de perdas por vencimento ou outros motivos
-- ----------------------------------------------------------------------------
CREATE TABLE perda (
    id_perda SERIAL PRIMARY KEY,
    id_lote INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    motivo VARCHAR(50) NOT NULL CHECK (motivo IN ('vencimento', 'avaria', 'contaminacao', 'outros')),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_perda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    
    CONSTRAINT fk_perda_lote FOREIGN KEY (id_lote) 
        REFERENCES lote(id_lote) ON DELETE RESTRICT,
    CONSTRAINT fk_perda_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario) ON DELETE RESTRICT
);

-- Comentários da tabela
COMMENT ON TABLE perda IS 'Registro de perdas para relatórios e análises';
COMMENT ON COLUMN perda.motivo IS 'vencimento: passou validade, avaria: danificado, contaminacao: contaminado';

-- ============================================================================
-- 3. CRIAÇÃO DE ÍNDICES PARA PERFORMANCE
-- ============================================================================

-- Índices para melhorar performance de consultas frequentes
CREATE INDEX idx_lote_produto ON lote(id_produto);
CREATE INDEX idx_lote_validade ON lote(data_validade) WHERE status = 'ativo';
CREATE INDEX idx_lote_status ON lote(status);

CREATE INDEX idx_venda_data ON venda(data_venda);
CREATE INDEX idx_venda_usuario ON venda(id_usuario);
CREATE INDEX idx_venda_forma_pagamento ON venda(forma_pagamento);

CREATE INDEX idx_item_venda_venda ON item_venda(id_venda);
CREATE INDEX idx_item_venda_produto ON item_venda(id_produto);
CREATE INDEX idx_item_venda_lote ON item_venda(id_lote);

CREATE INDEX idx_movimentacao_lote ON movimentacao(id_lote);
CREATE INDEX idx_movimentacao_data ON movimentacao(data_movimentacao);
CREATE INDEX idx_movimentacao_tipo ON movimentacao(tipo);

CREATE INDEX idx_perda_lote ON perda(id_lote);
CREATE INDEX idx_perda_data ON perda(data_perda);
CREATE INDEX idx_perda_motivo ON perda(motivo);

CREATE INDEX idx_produto_nome ON produto(nome);
CREATE INDEX idx_produto_ativo ON produto(ativo) WHERE ativo = TRUE;

-- ============================================================================
-- 4. CRIAÇÃO DE VIEWS PARA FACILITAR CONSULTAS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- View: Produtos com estoque abaixo do mínimo
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW view_produtos_estoque_baixo AS
SELECT 
    p.id_produto,
    p.nome,
    p.categoria,
    p.estoque_minimo,
    COALESCE(SUM(l.quantidade_atual), 0) as estoque_total,
    p.estoque_minimo - COALESCE(SUM(l.quantidade_atual), 0) as quantidade_faltante
FROM produto p
LEFT JOIN lote l ON p.id_produto = l.id_produto AND l.status = 'ativo'
WHERE p.ativo = TRUE
GROUP BY p.id_produto, p.nome, p.categoria, p.estoque_minimo
HAVING COALESCE(SUM(l.quantidade_atual), 0) < p.estoque_minimo
ORDER BY quantidade_faltante DESC;

COMMENT ON VIEW view_produtos_estoque_baixo IS 'Lista produtos com estoque abaixo do mínimo - para tela inicial';

-- ----------------------------------------------------------------------------
-- View: Produtos próximos do vencimento (10 dias)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW view_produtos_proximo_vencimento AS
SELECT 
    l.id_lote,
    p.id_produto,
    p.nome as produto,
    l.numero_lote,
    l.data_validade,
    l.quantidade_atual,
    (l.data_validade - CURRENT_DATE) as dias_para_vencer
FROM lote l
INNER JOIN produto p ON l.id_produto = p.id_produto
WHERE l.status = 'ativo'
  AND l.quantidade_atual > 0
  AND l.data_validade BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '10 days'
ORDER BY l.data_validade ASC;

COMMENT ON VIEW view_produtos_proximo_vencimento IS 'Lista lotes que vencem nos próximos 10 dias - para alertas';

-- ----------------------------------------------------------------------------
-- View: Dashboard - Resumo para tela inicial
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW view_dashboard_resumo AS
SELECT 
    (SELECT COUNT(*) FROM view_produtos_estoque_baixo) as produtos_estoque_baixo,
    (SELECT COUNT(*) FROM view_produtos_proximo_vencimento) as produtos_vencendo,
    (SELECT COALESCE(SUM(valor_total), 0) 
     FROM venda 
     WHERE DATE(data_venda) = CURRENT_DATE 
       AND status = 'concluida') as vendas_hoje,
    (SELECT COALESCE(SUM(valor_total), 0) 
     FROM venda 
     WHERE DATE_TRUNC('month', data_venda) = DATE_TRUNC('month', CURRENT_DATE)
       AND status = 'concluida') as vendas_mes,
    (SELECT COUNT(*) 
     FROM perda 
     WHERE DATE_TRUNC('month', data_perda) = DATE_TRUNC('month', CURRENT_DATE)) as perdas_mes;

COMMENT ON VIEW view_dashboard_resumo IS 'Resumo geral para exibição na tela inicial do sistema';

-- ----------------------------------------------------------------------------
-- View: Relatório de vendas detalhado
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW view_relatorio_vendas AS
SELECT 
    v.id_venda,
    v.data_venda,
    u.nome as vendedor,
    c.nome as cliente,
    v.valor_total,
    v.forma_pagamento,
    v.status,
    COUNT(iv.id_item_venda) as total_itens
FROM venda v
INNER JOIN usuario u ON v.id_usuario = u.id_usuario
LEFT JOIN cliente c ON v.id_cliente = c.id_cliente
LEFT JOIN item_venda iv ON v.id_venda = iv.id_venda
GROUP BY v.id_venda, v.data_venda, u.nome, c.nome, v.valor_total, v.forma_pagamento, v.status
ORDER BY v.data_venda DESC;

COMMENT ON VIEW view_relatorio_vendas IS 'Relatório detalhado de vendas para análises';

-- ----------------------------------------------------------------------------
-- View: Relatório de perdas
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW view_relatorio_perdas AS
SELECT 
    p.id_perda,
    p.data_perda,
    pr.nome as produto,
    l.numero_lote,
    l.data_validade,
    p.quantidade,
    p.motivo,
    (p.quantidade * pr.preco_venda) as valor_perda,
    u.nome as registrado_por,
    p.observacao
FROM perda p
INNER JOIN lote l ON p.id_lote = l.id_lote
INNER JOIN produto pr ON l.id_produto = pr.id_produto
INNER JOIN usuario u ON p.id_usuario = u.id_usuario
ORDER BY p.data_perda DESC;

COMMENT ON VIEW view_relatorio_perdas IS 'Relatório de perdas com valor estimado';

-- ----------------------------------------------------------------------------
-- View: Produtos mais vendidos
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW view_produtos_mais_vendidos AS
SELECT 
    p.id_produto,
    p.nome as produto,
    p.categoria,
    COUNT(DISTINCT iv.id_venda) as numero_vendas,
    SUM(iv.quantidade) as quantidade_total_vendida,
    SUM(iv.subtotal) as faturamento_total
FROM produto p
INNER JOIN item_venda iv ON p.id_produto = iv.id_produto
INNER JOIN venda v ON iv.id_venda = v.id_venda
WHERE v.status = 'concluida'
GROUP BY p.id_produto, p.nome, p.categoria
ORDER BY quantidade_total_vendida DESC;

COMMENT ON VIEW view_produtos_mais_vendidos IS 'Ranking de produtos mais vendidos';

-- ============================================================================
-- 5. CRIAÇÃO DE FUNÇÕES E TRIGGERS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Função: Atualizar estoque automaticamente após movimentação
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_atualizar_estoque()
RETURNS TRIGGER AS $
BEGIN
    -- Atualizar quantidade_atual do lote
    UPDATE lote 
    SET quantidade_atual = quantidade_atual + NEW.quantidade
    WHERE id_lote = NEW.id_lote;
    
    -- Atualizar status do lote se necessário
    UPDATE lote 
    SET status = CASE 
        WHEN quantidade_atual <= 0 THEN 'esgotado'
        WHEN data_validade < CURRENT_DATE THEN 'vencido'
        ELSE 'ativo'
    END
    WHERE id_lote = NEW.id_lote;
    
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger para movimentação
CREATE TRIGGER trg_atualizar_estoque
AFTER INSERT ON movimentacao
FOR EACH ROW
EXECUTE FUNCTION fn_atualizar_estoque();

COMMENT ON FUNCTION fn_atualizar_estoque() IS 'Atualiza estoque automaticamente após movimentação';

-- ----------------------------------------------------------------------------
-- Função: Registrar movimentação de saída ao vender
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_registrar_saida_venda()
RETURNS TRIGGER AS $
BEGIN
    -- Inserir movimentação de saída
    INSERT INTO movimentacao (id_lote, id_usuario, tipo, quantidade, observacao)
    SELECT 
        NEW.id_lote,
        v.id_usuario,
        'saida',
        -NEW.quantidade,
        'Venda #' || NEW.id_venda
    FROM venda v
    WHERE v.id_venda = NEW.id_venda;
    
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger para item_venda
CREATE TRIGGER trg_registrar_saida_venda
AFTER INSERT ON item_venda
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_saida_venda();

COMMENT ON FUNCTION fn_registrar_saida_venda() IS 'Registra movimentação de saída automaticamente ao vender';

-- ----------------------------------------------------------------------------
-- Função: Calcular subtotal automaticamente
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_calcular_subtotal_item()
RETURNS TRIGGER AS $
BEGIN
    NEW.subtotal := NEW.quantidade * NEW.preco_unitario;
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger para cálculo automático
CREATE TRIGGER trg_calcular_subtotal
BEFORE INSERT OR UPDATE ON item_venda
FOR EACH ROW
EXECUTE FUNCTION fn_calcular_subtotal_item();

COMMENT ON FUNCTION fn_calcular_subtotal_item() IS 'Calcula subtotal automaticamente em itens de venda';

-- ----------------------------------------------------------------------------
-- Função: Registrar perda automaticamente em lotes vencidos
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_verificar_vencimento_lote()
RETURNS TRIGGER AS $
BEGIN
    -- Se o lote venceu e ainda tem quantidade
    IF NEW.status = 'vencido' AND NEW.quantidade_atual > 0 THEN
        -- Registrar perda automaticamente
        INSERT INTO perda (id_lote, id_usuario, motivo, quantidade, observacao)
        VALUES (
            NEW.id_lote,
            1, -- usuário sistema (pode ser parametrizado)
            'vencimento',
            NEW.quantidade_atual,
            'Perda automática por vencimento'
        );
        
        -- Zerar quantidade do lote
        NEW.quantidade_atual := 0;
    END IF;
    
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger para verificação de vencimento
CREATE TRIGGER trg_verificar_vencimento
BEFORE UPDATE ON lote
FOR EACH ROW
EXECUTE FUNCTION fn_verificar_vencimento_lote();

COMMENT ON FUNCTION fn_verificar_vencimento_lote() IS 'Registra perda automaticamente quando lote vence';

-- ============================================================================
-- 6. PROCEDURES PARA RELATÓRIOS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Procedure: Relatório de vendas por período
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_relatorio_vendas_periodo(
    data_inicio DATE,
    data_fim DATE
)
RETURNS TABLE (
    data DATE,
    total_vendas BIGINT,
    valor_total NUMERIC,
    ticket_medio NUMERIC
) AS $
BEGIN
    RETURN QUERY
    SELECT 
        DATE(v.data_venda) as data,
        COUNT(v.id_venda) as total_vendas,
        SUM(v.valor_total) as valor_total,
        AVG(v.valor_total) as ticket_medio
    FROM venda v
    WHERE DATE(v.data_venda) BETWEEN data_inicio AND data_fim
      AND v.status = 'concluida'
    GROUP BY DATE(v.data_venda)
    ORDER BY DATE(v.data_venda) DESC;
END;
$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_relatorio_vendas_periodo IS 'Gera relatório de vendas por período especificado';

-- ----------------------------------------------------------------------------
-- Procedure: Relatório de vendas por forma de pagamento
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_relatorio_forma_pagamento(
    data_inicio DATE DEFAULT NULL,
    data_fim DATE DEFAULT NULL
)
RETURNS TABLE (
    forma_pagamento VARCHAR,
    quantidade BIGINT,
    valor_total NUMERIC,
    percentual NUMERIC
) AS $
BEGIN
    RETURN QUERY
    WITH vendas_periodo AS (
        SELECT v.*
        FROM venda v
        WHERE (data_inicio IS NULL OR DATE(v.data_venda) >= data_inicio)
          AND (data_fim IS NULL OR DATE(v.data_venda) <= data_fim)
          AND v.status = 'concluida'
    ),
    total_geral AS (
        SELECT SUM(valor_total) as total
        FROM vendas_periodo
    )
    SELECT 
        vp.forma_pagamento,
        COUNT(vp.id_venda) as quantidade,
        SUM(vp.valor_total) as valor_total,
        ROUND((SUM(vp.valor_total) / tg.total * 100), 2) as percentual
    FROM vendas_periodo vp
    CROSS JOIN total_geral tg
    GROUP BY vp.forma_pagamento, tg.total
    ORDER BY valor_total DESC;
END;
$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_relatorio_forma_pagamento IS 'Relatório de vendas agrupado por forma de pagamento';

-- ============================================================================
-- 7. DADOS INICIAIS (SEED DATA)
-- ============================================================================

-- Inserir usuário administrador padrão (senha: admin123 - ALTERAR EM PRODUÇÃO!)
INSERT INTO usuario (nome, email, senha_hash, perfil) VALUES
('Administrador', 'admin@sistema.com', '$2a$10$XQj9Hh6rKPK9k.Kx8kJ3.OGxqKJQj9Hh6rKPK9k.Kx8kJ3', 'admin');

-- Inserir categorias de produtos exemplo
INSERT INTO produto (nome, categoria, unidade_medida, estoque_minimo, preco_venda) VALUES
('Polpa de Açaí', 'Tropical', 'kg', 50, 15.00),
('Polpa de Morango', 'Vermelha', 'kg', 30, 18.00),
('Polpa de Manga', 'Tropical', 'kg', 40, 12.00),
('Polpa de Maracujá', 'Cítrica', 'kg', 35, 14.00),
('Polpa de Goiaba', 'Vermelha', 'kg', 25, 13.00);

-- ============================================================================
-- 8. CONCESSÃO DE PERMISSÕES (JAVA BACKEND)
-- ============================================================================

-- Criar role para aplicação Java Spring Boot
CREATE ROLE java_app_estoque WITH LOGIN PASSWORD 'StrongP@ssw0rd2025!';

-- Conceder permissões necessárias para o backend Java
GRANT CONNECT ON DATABASE estoque_db TO java_app_estoque;
GRANT USAGE ON SCHEMA public TO java_app_estoque;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO java_app_estoque;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO java_app_estoque;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO java_app_estoque;

-- Permissões para futuras tabelas/sequências
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO java_app_estoque;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT USAGE, SELECT ON SEQUENCES TO java_app_estoque;

-- Role para relatórios (somente leitura)
CREATE ROLE java_app_readonly WITH LOGIN PASSWORD 'ReadOnly@2025!';
GRANT CONNECT ON DATABASE estoque_db TO java_app_readonly;
GRANT USAGE ON SCHEMA public TO java_app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO java_app_readonly;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO java_app_readonly;

COMMENT ON ROLE java_app_estoque IS 'Role para aplicação Java Spring Boot - acesso completo';
COMMENT ON ROLE java_app_readonly IS 'Role para relatórios Java - somente leitura';

-- ============================================================================
-- 9. SCRIPTS DE MANUTENÇÃO E MONITORAMENTO
-- ============================================================================

-- Script para verificar integridade dos dados
CREATE OR REPLACE FUNCTION fn_verificar_integridade()
RETURNS TABLE (
    tabela VARCHAR,
    problema VARCHAR,
    quantidade BIGINT
) AS $
BEGIN
    -- Verificar lotes com quantidade negativa
    RETURN QUERY
    SELECT 
        'lote'::VARCHAR as tabela,
        'Quantidade atual negativa'::VARCHAR as problema,
        COUNT(*)::BIGINT as quantidade
    FROM lote 
    WHERE quantidade_atual < 0;
    
    -- Verificar vendas com valor zerado
    RETURN QUERY
    SELECT 
        'venda'::VARCHAR,
        'Valor total zerado ou negativo'::VARCHAR,
        COUNT(*)::BIGINT
    FROM venda 
    WHERE valor_total <= 0;
    
    -- Verificar lotes vencidos ativos
    RETURN QUERY
    SELECT 
        'lote'::VARCHAR,
        'Lotes vencidos ainda marcados como ativos'::VARCHAR,
        COUNT(*)::BIGINT
    FROM lote 
    WHERE status = 'ativo' AND data_validade < CURRENT_DATE;
END;
$ LANGUAGE plpgsql;

COMMENT ON FUNCTION fn_verificar_integridade() IS 'Verifica inconsistências nos dados';

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================

-- Para testar a instalação, execute:
-- SELECT * FROM view_dashboard_resumo;
-- SELECT * FROM fn_verificar_integridade();