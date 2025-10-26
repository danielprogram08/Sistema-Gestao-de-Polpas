# Sistema de Gestão de Roupas - Frontend

Este é o repositório para o frontend do Sistema de Gestão de Roupas, desenvolvido com React e Vite.

## Como Começar

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O projeto estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

---

## Fluxo de Trabalho com Git

Para manter o projeto organizado e evitar conflitos, siga as diretrizes abaixo.

### 1. Sincronize seu Repositório

**Antes de começar a trabalhar**, sempre puxe as alterações mais recentes do repositório remoto para o seu ambiente local. Isso evita conflitos e garante que você está trabalhando na versão mais atual do código.

```bash
git pull
```

### 2. Convenção de Commits

Use uma nomenclatura simples e clara para seus commits. Isso ajuda a entender rapidamente o que cada alteração faz. O formato é `<tipo>: <descrição>`.

**Exemplos:**

-   `feat: Adiciona formulário de login`
-   `fix: Corrige bug no cálculo de total do carrinho`

**Tipos de Commit:**

-   **feat**: Para novas funcionalidades (features).
-   **fix**: Para correções de bugs.

---

## Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para separar as responsabilidades e facilitar a manutenção.

-   `public/`: Contém arquivos estáticos que são servidos diretamente pelo servidor, como o `vite.svg`.

-   `src/`: Contém todo o código-fonte da aplicação.

    -   `assets/`: Armazena arquivos de mídia, como imagens, fontes e ícones (`react.svg`).

    -   `components/`: Contém componentes React reutilizáveis em várias partes da aplicação (ex: `Header.jsx`, `Button.jsx`).

    -   `pages/`: Contém os componentes que representam as páginas principais da aplicação (ex: `HomePage.jsx`, `LoginPage.jsx`).

    -   `services/`: Armazena a lógica de comunicação com APIs externas, como serviços de autenticação ou busca de dados.