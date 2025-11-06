# Banco de Dados SGP – Sistema Gerenciador de Polpas

## 📘 Informações do Projeto

| Item | Detalhe |
|------|----------|
| **Projeto** | Sistema de Estoque Inteligente para Microempresa de Polpas |
| **Instituição** | UNIFAMETRO – Análise e Desenvolvimento de Sistemas |
| **SGBD** | PostgreSQL 12+ |
| **Versão do Banco** | 1.0 |
| **Data** | Outubro de 2025 |

---
<br>

## 🧭 Sumário

<details>
  <summary><b>Mostrar mais detalhes</b></summary>
  <br>

  1. Visão Geral  
  2. Arquitetura do Banco  
  3. Dicionário de Dados  
  4. Relacionamentos  
  5. Regras de Negócio  
  6. Views e Procedures  
  7. Triggers e Automações  
  8. Índices e Performance  
  9. Segurança e Permissões  
  10. Integração com Backend  
  11. Exemplos de Consultas  
  12. Manutenção e Backup  

</details>

---
</br>

# 🧩 1. Visão Geral

O banco de dados foi projetado para atender às necessidades específicas de uma microempresa de polpas de frutas, com foco em:

- ✅ Controle de estoque por lote com rastreabilidade completa  
- ✅ Alertas de vencimento configuráveis  
- ✅ Registro detalhado de vendas com formas de pagamento  
- ✅ Relatórios de perdas para tomada de decisão  
- ✅ Interface simples para facilitar integração  
- ✅ Automação de processos via triggers  

---
<br>

## 🔧 Principais Problemas Resolvidos


| Problema | Solução Implementada |
|-----------|----------------------|
| Produtos vencem sem aviso | View `view_produtos_proximo_vencimento` com alertas de 10 dias |
| Falta de controle de estoque | Tabela `lote` com controle por data de validade |
| Dificuldade em relatórios | Views pré-configuradas para relatórios rápidos |
| Inconsistência de dados | Triggers automáticos para atualização de estoque |
| Controle de perdas | Tabela `perda` com registro automático de vencimentos |

---
</br>

# 🏗️ 2. Arquitetura do Banco

## Diagrama de Entidades (Representação textual)

```text
         ┌──────────────────────────────┐
         │          CLIENTE             │
         └──────────────┬───────────────┘
                        │ (1)
                        │
                (N) VENDA
                        │
         ┌──────────────┴──────────────┐
         │          USUARIO            │
         └─────────────────────────────┘

                        │
                        └── (N) ITEM_VENDA ── (1) PRODUTO
                                       │
                                       └── (1) LOTE
                        │
                        └── (N) MOVIMENTACAO
                                       │
                                       └── (N) PERDA
```
</br>

# 🧱 Estrutura de Tabelas

O banco possui 8 tabelas principais:

| Nº | Tabela | Finalidade |
|----|---------|------------|
| 1 | **usuario** | Controle de acesso |
| 2 | **produto** | Cadastro de polpas |
| 3 | **lote** | Controle de validade |
| 4 | **cliente** | Pedidos grandes |
| 5 | **venda** | Transações |
| 6 | **item_venda** | Detalhes das vendas |
| 7 | **movimentacao** | Histórico de estoque |
| 8 | **perda** | Registro de perdas |

---
</br>

# 🧾 3. Dicionário de Dados

## 🧑‍💻 Tabela: USUARIO

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_usuario | SERIAL | PK | Identificador único |
| nome | VARCHAR(100) | NOT NULL | Nome completo do usuário |
| email | VARCHAR(150) | UNIQUE, NOT NULL | Email de acesso |
| senha_hash | VARCHAR(255) | NOT NULL | Hash bcrypt da senha |
| perfil | VARCHAR(20) | NOT NULL, DEFAULT 'operador' | Perfil (admin, gerente, operador) |
| ativo | BOOLEAN | DEFAULT TRUE | Status do usuário |
| data_criacao | TIMESTAMP | DEFAULT NOW() | Data de cadastro |
<br>

**Índices:**  
- PK em `id_usuario`  
- UNIQUE em `email`  

**Observações:**  
- `admin`: acesso total  
- `gerente`: relatórios e cadastros  
- `operador`: vendas e consultas 
---
<br>

## 🧃 Tabela: PRODUTO

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_produto | SERIAL | PK | Identificador único |
| nome | VARCHAR(100) | UNIQUE, NOT NULL | Nome da polpa |
| categoria | VARCHAR(50) |  | Tropical, Cítrica, Vermelha |
| unidade_medida | VARCHAR(20) | NOT NULL, DEFAULT 'kg' | kg, litro, unidade |
| estoque_minimo | INTEGER | DEFAULT 0, CHECK >= 0 | Quantidade mínima para alerta |
| preco_venda | DECIMAL(10,2) | NOT NULL, CHECK > 0 | Preço unitário |
| ativo | BOOLEAN | DEFAULT TRUE | Produto ativo |
| data_cadastro | TIMESTAMP | DEFAULT NOW() | Data de cadastro |
<br>

**Índices:**  
- PK em `id_produto`  
- INDEX em `nome`  
- INDEX em `ativo` WHERE ativo = TRUE  

**Observações:**  
- `estoque_minimo` é usado na `view view_produtos_estoque_baixo` 
- Produtos inativos não aparecem em relatórios, mas mantêm histórico 
---
<br>

## 📦 Tabela: LOTE

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_lote | SERIAL | PK | Identificador único |
| id_produto | INTEGER | FK, NOT NULL | Referência ao produto |
| numero_lote | VARCHAR(50) | NOT NULL | Número do lote |
| data_fabricacao | DATE |  | Data de fabricação |
| data_validade | DATE | NOT NULL | Data de vencimento |
| quantidade_inicial | INTEGER | NOT NULL, CHECK > 0 | Quantidade ao criar lote |
| quantidade_atual | INTEGER | NOT NULL, CHECK >= 0 | Quantidade disponível |
| status | VARCHAR(20) | DEFAULT 'ativo' | ativo, vencido, esgotado |
| data_cadastro | TIMESTAMP | DEFAULT NOW() | Data de criação |
<br>

**Índices:**
 - PK em `id_lote`
 - INDEX em `id_produto`
 - INDEX em `data_validade WHERE status = 'ativo'` (consultas de vencimento)
 - INDEX em `status`
 
 **Constraints:**
 - UNIQUE em `(numero_lote, id_produto)`
 - CHECK: `quantidade_atual` <= `quantidade_inicial`
 - CHECK: `data_validade` >= ``Data_fabricacao`

**Observações:**  
- Status é atualizado automaticamente via trigger  
- Lotes vencidos geram registro automático de perda  

---
<br>

## 👤 Tabela: CLIENTE

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_cliente | SERIAL | PK | Identificador único |
| nome | VARCHAR(100) | NOT NULL | Nome do cliente |
| telefone | VARCHAR(20) |  | Telefone de contato |
| email | VARCHAR(150) |  | Email de contato |
| endereco | VARCHAR(255) |  | Endereço completo |
| ativo | BOOLEAN | DEFAULT TRUE | Cliente ativo |
| data_cadastro | TIMESTAMP | DEFAULT NOW() | Data de cadastro |
<br>

 **Observações:**
 - Cadastro opcional, usado apenas em pedidos grandes
 - Vendas pequenas não precisam de cliente

---
<br>

## 💰 Tabela: VENDA

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_venda | SERIAL | PK | Identificador da venda |
| id_cliente | INTEGER | FK | Cliente que realizou a compra |
| id_usuario | INTEGER | FK | Usuário responsável pela venda |
| data_venda | TIMESTAMP | DEFAULT NOW() | Data da venda |
| valor_total | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Valor total da venda |
| forma_pagamento | VARCHAR(20) |  | Dinheiro, cartão, PIX |
| status | VARCHAR(20) | DEFAULT 'concluida' | concluiuda, cancelada |
<br>

 **Índices:**
 - PK em `id_venda`
 - INDEX em `data_venda` (relatórios por período)
 - INDEX em `id_usuario`
 - INDEX em ``forma_pagamento`
 
 **Observações:**
 - id_cliente é NULL para vendas pequenas
 - Forma de pagamento essencial para relatórios financeiros


---
<br>

## 🛒 Tabela: ITEM_VENDA

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_item_venda | SERIAL | PK | Identificador do item |
| id_venda | INTEGER | FK, NOT NULL | Referência à venda |
| id_produto | INTEGER | FK, NOT NULL | Produto vendido |
| id_lote | INTEGER | FK | Lote do produto |
| quantidade | INTEGER | NOT NULL, CHECK > 0 | Quantidade vendida |
| preco_unitario | DECIMAL(10,2) | NOT NULL, CHECK > 0 | Preço unitário |
| subtotal | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Valor parcial |
<br>

**Índices:**
 - PK em `id_item_venda`
 - INDEX em `id_venda`
 - INDEX em `id_produto`
 - INDEX em `id_lote`

 **Triggers:**
 - trg_calcular_subtotal: Calcula subtotal automaticamente
 - trg_registrar_saida_venda: Cria movimentação de saída
 
 **Observações:**
 - Rastreabilidade total: cada item sabe de qual lote veio
 - Subtotal calculado automaticamente via trigger

---

<br>

## 📦 Tabela: MOVIMENTACAO

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_movimentacao | SERIAL | PK | Identificador da movimentação |
| id_produto | INTEGER | FK, NOT NULL | Produto movimentado |
| id_lote | INTEGER | FK | Lote movimentado |
| tipo | VARCHAR(20) | NOT NULL | Entrada, Saída, Ajuste |
| quantidade | INTEGER | NOT NULL | Quantidade movimentada |
| data_movimentacao | TIMESTAMP | DEFAULT NOW() | Data da movimentação |
| id_usuario | INTEGER | FK | Usuário responsável |
<br>

 **Índices:**
 - PK em `id_movimentacao`
 - INDEX em `id_lote`
 - INDEX em `data_movimentacao`
 - INDEX em `tipo`
 
 **Triggers:**
 - trg_atualizar_estoque: Atualiza quantidade_atual do lote
 
 **Observações:**
 - Quantidade positiva para entrada, negativa para saída
 - Movimentações de venda são criadas automaticamente

---

<br>

## 📉 Tabela: PERDA

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| id_perda | SERIAL | PK | Identificador da perda |
| id_produto | INTEGER | FK, NOT NULL | Produto perdido |
| id_lote | INTEGER | FK | Lote do produto |
| quantidade | INTEGER | NOT NULL, CHECK > 0 | Quantidade perdida |
| motivo | VARCHAR(100) |  | Vencimento, Quebra, Dano |
| data_perda | TIMESTAMP | DEFAULT NOW() | Data da perda |
| id_usuario | INTEGER | FK | Usuário responsável |
<br>

 **Índices:**
- PK em `id_perda`
 - INDEX em `id_lote`
 - INDEX em `data_perda`
 - INDEX em `motivo`

**Observações:**
 - Perdas por vencimento são registradas automaticamente
 - Valor da perda calculado na view `view_relatorio_perdas`

---

<br>

# 🔗 4. Relacionamentos

## Relacionamentos 1:N (Um para Muitos)

| Tabela Pai | Tabela Filha   | Tipo | Descrição |
|-------------|----------------|------|------------|
| **produto** | **lote** | 1:N | Um produto tem vários lotes |
| **lote** | **movimentacao** | 1:N | Um lote tem várias movimentações |
| **lote** | **item_venda** | 1:N | Um lote fornece vários itens |
| **lote** | **perda** | 1:N | Um lote pode ter várias perdas |
| **usuario** | **venda** | 1:N | Um usuário realiza várias vendas |
| **usuario** | **movimentacao** | 1:N | Um usuário faz várias movimentações |
| **usuario** | **perda** | 1:N | Um usuário registra várias perdas |
| **cliente** | **venda** | 1:N | Um cliente faz várias compras |
| **venda** | **item_venda** | 1:N | Uma venda tem vários itens |
| **produto** | **item_venda** | 1:N | Um produto está em vários itens |

---
<br>

## 📊 Cardinalidades Importantes

```text
PRODUTO (1)
   │
   ├────< LOTE (N)
   │        │
   │        ├────< MOVIMENTACAO (N)
   │        ├────< ITEM_VENDA (N)
   │        └────< PERDA (N)
   │
USUARIO (1)
   │
   ├────< VENDA (N) ────< ITEM_VENDA (N)
   │
   ├────< MOVIMENTACAO (N)
   │
   └────< PERDA (N)

CLIENTE (1)
   │
   └────< VENDA (N)
```
<br>


# 5. Regras de Negócio

RN01 - Controle de Estoque Mínimo

Regra: Sistema deve alertar quando quantidade total de um produto cair abaixo do estoque mínimo.

Implementação:
View view_produtos_estoque_baixo
Exibição na tela inicial do sistema

SQL:

sql
SELECT * FROM view_produtos_estoque_baixo;
#

RN02 - Alerta de Vencimento

Regra: Produtos que vencem em 10 dias devem aparecer em destaque na tela inicial.

Implementação:
View view_produtos_proximo_vencimento
Margem de 10 dias configurável ajustando a view

SQL:
sql
SELECT * FROM view_produtos_proximo_vencimento;
Para alterar margem (exemplo: 7 dias):
sql
-- -- Alterar na view: CURRENT_DA Alterar na view: CURRENT_DATE + INTER TE + INTERVVALAL '7 days' '7 days'
#

RN03 - Registro Automático de Perdas
Regra: Lotes vencidos com quantidade > 0 devem gerar automaticamente registro de perda.
Implementação:
Trigger trg_verificar_vencimento na tabela lote
Função fn_verificar_vencimento_lote()
Comportamento:
1. Ao atualizar status do lote para 'vencido'
2. Se quantidade_atual > 0
3. Cria registro em perda com motivo 'vencimento'
4. Zera quantidade_atual do lote
#

RN04 - Atualização Automática de Estoque
Regra: Ao registrar uma venda, o estoque deve ser atualizado automaticamente.
Implementação:
Trigger trg_registrar_saida_venda na tabela item_venda
Trigger trg_atualizar_estoque na tabela movimentacao
Fluxo:
1. Inserir item_venda
2. Trigger cria movimentacao (saída)
3. Trigger atualiza quantidade_atual do lote
4. Atualiza status do lote se necessário
#

RN05 - Rastreabilidade de Lotes
Regra: Cada venda deve registrar de qual lote específico o produto veio.
Implementação:
Campo id_lote na tabela item_venda
Foreign key para tabela lote
Benefício:
Rastreamento completo em caso de problemas de qualidade
Controle preciso do FIFO (First In, First Out)
#

RN06 - Validação de Quantidades
Regra: Quantidade atual de um lote nunca pode ser maior que a inicial.
Implementação:
Constraint CHECK na tabela lote
CHECK (quantidade_atual <= quantidade_inicial)
#

RN07 - Formas de Pagamento
Regra: Toda venda deve ter forma de pagamento registrada.
Implementação:
Campo obrigatório forma_pagamento na tabela venda
CHECK constraint com valores válidos
Valores aceitos:
dinheiro
pix
cartao_debito
cartao_credito
#

RN08 - Cliente Opcional
Regra: Cliente só é obrigatório para pedidos grandes.
Implementação:
Campo id_cliente NULL na tabela venda
Decisão de cadastrar fica a critério do operador
#

# 6. Views e Procedures

Views Principais

1. view_produtos_estoque_baixo
Propósito: Lista produtos com estoque abaixo do mínimo.
Uso:
sql
SELECT * FROM view_produtos_estoque_baixo;
Colunas:
id_produto
nome
categoria
estoque_minimo
estoque_total (soma de todos os lotes ativos)
quantidade_faltante
Integração Backend:
javascript
// GET /api/dashboard/estoque-baixo
SELECT * FROM view_produtos_estoque_baixo;
#

2. view_produtos_proximo_vencimento
Propósito: Alerta de produtos que vencem em 10 dias.
Uso:
sql
SELECT * FROM view_produtos_proximo_vencimento;
Colunas:
id_lote
id_produto
produto (nome)
numero_lote
data_validade
quantidade_atual
dias_para_vencer
#

3. view_dashboard_resumo
Propósito: Resumo geral para tela inicial.
Uso:
sql
SELECT * FROM view_dashboard_resumo;
Retorna:
produtos_estoque_baixo (quantidade)
produtos_vencendo (quantidade)
vendas_hoje (valor R$)
vendas_mes (valor R$)
perdas_mes (quantidade)
Exemplo de resposta:
json
{
 "produtos_estoque_baixo": 3,
 "produtos_vencendo": 5,
 "vendas_hoje": 450.00,
 "vendas_mes": 12500.00,
 "perdas_mes": 8
}
#

4. view_relatorio_vendas
Propósito: Relatório detalhado de vendas.
Uso:
sql
SELECT * FROM view_relatorio_vendas
WHERE DATE(data_venda) = CURRENT_DATE;
#

5. view_relatorio_perdas
Propósito: Relatório de perdas com valor estimado.
Uso:
sql
SELECT * FROM view_relatorio_perdas
WHERE DATE_TRUNC('month', data_perda) = DATE_TRUNC('month', CURRENT_DATE);
#

6. view_produtos_mais_vendidos
Propósito: Ranking de produtos mais vendidos.
Uso:
sql
SELECT * FROM view_produtos_mais_vendidos
LIMIT 10;
Procedures (Functions)
#

1. fn_relatorio_vendas_periodo
Propósito: Relatório de vendas agregado por dia.
Uso:
sql
SELECT * FROM fn_relatorio_vendas_periodo('2025-10-01', '2025-10-31');
Retorna:
data
total_vendas (quantidade)
valor_total (R$)
ticket_medio (R$)
#

2. fn_relatorio_forma_pagamento
Propósito: Análise de vendas por forma de pagamento.
Uso:
sql
-- Mês atual
SELECT * FROM fn_relatorio_forma_pagamento(NULL, NULL);
-- Período específico
SELECT * FROM fn_relatorio_forma_pagamento('2025-10-01', '2025-10-31');
Retorna:
forma_pagamento
quantidade (número de vendas)
valor_total (R$)
percentual (%)
#

3. fn_verificar_integridade
Propósito: Verificar inconsistências nos dados.
Uso:
sql
SELECT * FROM fn_verificar_integridade();
Retorna problemas como:
Lotes com quantidade negativa
Vendas com valor zerado
Lotes vencidos marcados como ativos
#

# 7. Triggers e Automações

Trigger 1: trg_atualizar_estoque
Tabela: movimentacao
Evento: AFTER INSERT
Função: fn_atualizar_estoque()
O que faz:
1. Atualiza quantidade_atual do lote
2. Atualiza status do lote (esgotado, vencido, ativo)
Exemplo:
sql
-- Inserir entrada
INSERT INTO movimentacao (id_lote, id_usuario, tipo, quantidade, observacao)
VALUES (1, 1, 'entrada', 50, 'Compra de fornecedor');
-- Lote é atualizado automaticamente
#

Trigger 2: trg_registrar_saida_venda
Tabela: item_venda
Evento: AFTER INSERT
Função: fn_registrar_saida_venda()
O que faz: Cria automaticamente uma movimentação de saída quando um item é vendido.
Fluxo:
Venda → Item_Venda → Movimentacao (automático) → Atualiza Lote (automático)
#

Trigger 3: trg_calcular_subtotal
Tabela: item_venda
Evento: BEFORE INSERT OR UPDATE
Função: fn_calcular_subtotal_item()
O que faz: Calcula subtotal = quantidade * preco_unitario automaticamente.
#

Trigger 4: trg_verificar_vencimento
Tabela: lote
Evento: BEFORE UPDATE
Função: fn_verificar_vencimento_lote()
O que faz:
1. Detecta quando lote muda para status 'vencido'
2. Se tem quantidade > 0, cria registro de perda
3. Zera quantidade do lote
#

# 8. Índices e Performance

Índices Criados

Tabela Índice Tipo Justificativa
lote idx_lote_validade INDEX WHERE Consultas de vencimento frequentes
lote idx_lote_produto INDEX Join com produto
venda idx_venda_data INDEX Relatórios por período
venda idx_venda_forma_pagamento INDEX Análise financeira
movimentacao idx_movimentacao_data INDEX Histórico temporal
produto idx_produto_nome INDEX Buscas por nome

Otimizações Implementadas

1. Índices Parciais:
idx_lote_validade WHERE status = 'ativo'
idx_produto_ativo WHERE ativo = TRUE
2. Índices Compostos:
UNIQUE em (numero_lote, id_produto)
3. Primary Keys:
SERIAL (auto-incremento) em todas as tabelas
#

🔒 Segurança e Permissões

Roles Sugeridas

 sql
 
 -- Role para aplicação
  CREATE ROLE app_estoque WITH LOGIN PASSWORD 'senha_forte';
 
 -- Permissões
 
- GRANT CONNECT ON DATABASE estoque_db TO  app_estoque;
- GRANT USAGE ON SCHEMA public TO app_estoque;
- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN  SCHEMA public TO app_estoque;
- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA  public TO app_estoque; 
 
 -- Role somente leitura (relatórios)
 
- CREATE ROLE app_relatorios WITH LOGIN PASSWORD  'senha_relatorios';
- GRANT CONNECT ON DATABASE estoque_db TO  app_relatorios;
- GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_relatorios;

 Senhas
 
⚠ IMPORTANTE:

- Senha padrão do admin: admin123 (ALTERAR IMEDIATAMENTE!)
- Usar bcrypt para hash de senhas no backen
- Nunca armazenar senhas em texto plano

Backup Diário 

```bash 
# Backup completo 
pg_dump -U postgres -d estoque_db -F c -b -v -f  "backup_estoque_$(date +%Y%m%d).backup"

# Backup apenas dados 
 pg_dump -U postgres -d estoque_db -a -F p -f "backup_dados_$(date +%Y%m%d).sql"
 ```

 Restore

 ```bash
 # Restaurar backup completo
 pg_restore -U postgres -d estoque_db -v "backup_estoque_20251015
 ```
