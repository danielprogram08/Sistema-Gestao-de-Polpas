# Repositório Banco de Dados SGP (Sistema Gerenciador de Poupas).

## Estrutura do Banco de Dados -> Diagrama de Entidade e Relacionamento

![Img1](<IMG1.png>)

![Img2](<IMG2.png>)

## Relacionamento das Tabelas

**USUARIO ↔ VENDA**

***Relacionamento: 1:N (Um Usuário realiza N Vendas)***

Regra: Cada venda é registrada por um usuário.

**PRODUTO ↔ LOTE**

***Relacionamento: 1:N (Um Produto tem N Lotes)***

Regra: Atende à regra de negócio: "Produtos devem ser controlados por lote e data de validade."

**LOTE ↔ ITEM_VENDA**

***Relacionamento: 1:N (Um Lote pode estar em N Itens de Venda)***

Regra: Garante que cada venda debite do lote correto para fins de controle de validade/perda.

**VENDA ↔ ITEM_VENDA**

***Relacionamento: 1:N (Uma Venda tem N Itens de Venda)***

Regra: Permite que uma venda inclua múltiplos produtos/lotes.

**LOTE ↔ MOVIMENTACAO**

***Relacionamento: 1:N (Um Lote tem N Movimentações)***

Regra: Registra a entrada (compra) ou saída (ajuste/perda) de estoque, vinculando sempre ao lote.

**OBSERVAÇÃO: A tabela MOVIMENTACAO é usada para registrar perdas por vencimento (Relatório 3.1) e outros ajustes de estoque. As saídas por venda são controladas pelas tabelas VENDA e ITEM_VENDA.**

-----------------------------------------------------------

# Ambiente de Homologação do Banco de Dados (Opcional)

## Docker: Instalação e Configuração

### **Tutorial Youtube:**

**Windows:** *https://www.youtube.com/watch?v=kh1gkqCrNx4*

**Linux:** *https://www.youtube.com/watch?v=aGoQFy3BHHE*

----------------------------------

# Como Rodar o Banco de Dados via Docker

- No arquivo **'docker-compose-exemple'** você pode usar de exemplo para a construção do ambiente local do banco de dados;

- Via bash, dentro do diretório DB, execute o comando: ***'docker-compose' up -d'***;

- Em seguida, execute o comando: ***docker container inspect estoque_db***;

- Copie o **IpAddress** do container;

- Cole no Host do seu SGBD;

- Insira o User: **estoques**, senha: **estoques** e Db: **estoques_db**;